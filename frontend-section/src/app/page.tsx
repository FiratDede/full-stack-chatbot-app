"use client";
import { serverUrl } from "@/constants";
import "./home.css"
import { useEffect, useRef, useState } from "react";
import useSWR from 'swr'
import useFetch from "./hooks/useFetch";
import useWindowSize from "./hooks/useWindowSize";
import Link from "next/link";
import UserSessionListDrawer from "./homePageComponents/UserSessionListDrawer/UserSessionListDrawer";

export default function Home() {
  const windowSize = useWindowSize();

  const [question, setQuestion] = useState<string>("");

  const [userSessions, setUserSessions] = useState<Array<any>>([])

  const { isLoading: getAllUserSessionsLoading, data: getAllUserSessionsData, sendRequest: sendGetAllUserSessionsData, error: getAllUserSessionsError } = useFetch({ withToken: true });

  const { isLoading: getMessagesLoading, data: getMessagesResponse, sendRequest: sendGetMessages, error: getMessagesError } = useFetch({ withToken: true });

  const [messages, setMessages] = useState<Array<any>>([]);

  const { isLoading: createUserSessionLoading, data: createUserSessionData, sendRequest: sendCreateUserSession, error: createUserSessionError } = useFetch({ withToken: true });


  const { isLoading: createMessageLoading, data: createMessageResponse, sendRequest: sendCreateMessage, error: createMessageError } = useFetch({ withToken: true });


  const [selectedUserSessionId, setSelectedUserSessionId] = useState<string>("");


  const chatMessagesSectionScroll = useRef<HTMLDivElement | null>(null);


  const questionInputDefaultClass = "min-w-56 my-2 py-4 px-2 flex-1  outline-none focus:border-amber-500 border-slate-400 border rounded"

  const questionInputDisabledClass = "min-w-56 my-2 py-4 px-2 flex-1  outline-none border-slate-400 border rounded"

  const questionInputErrorClass = "min-w-56 my-2 py-4 px-2 flex-1  outline-none border-red-400 border rounded"


  const disabledSubmitButtonClass = "border border-slate-400 ml-2 p-4 text-slate-400 rounded";

  const nonDisabledSubmitButtonClass = "border border-slate-400 ml-2 p-4 bg-amber-500 text-white rounded";

  const [isUserSessionListOpen, setIsUserSessionListOpen] = useState<boolean>(true)

  useEffect(() => {
    sendGetAllUserSessionsData(serverUrl + "/userSession/all", "GET", {})
  }, [])


  useEffect(() => {
    if (createUserSessionData) {
      setUserSessions((prev: any) => {
        const newUserSessionIds = [createUserSessionData, ...prev]
        return newUserSessionIds
      })
      setSelectedUserSessionId(createUserSessionData._id)
    }
  }, [createUserSessionData])




  useEffect(() => {
    if (chatMessagesSectionScroll.current) {
      chatMessagesSectionScroll.current.scrollTo(0, chatMessagesSectionScroll.current.scrollHeight);
    }

  }, [messages])


  useEffect(() => {
    if (getAllUserSessionsData) {
      setUserSessions(getAllUserSessionsData)
    }

  }, [getAllUserSessionsData])

  useEffect(() => {
    if (getMessagesResponse) {
      setMessages(getMessagesResponse)
    }
  },
    [getMessagesResponse])

  useEffect(() => {
    if (createMessageResponse && selectedUserSessionId === createMessageResponse.userSessionId) {

      setMessages((prev: any) => {
        const newMessages = [...prev, createMessageResponse]
        return newMessages;
      })
      console.log("selectedUserSessionId: " + createMessageResponse.userSessionId)
    }

  }, [createMessageResponse])

  useEffect(() => {
    if (selectedUserSessionId !== "") {
      sendGetMessages(serverUrl + "/message/all?userSessionId=" + selectedUserSessionId, "GET", {})
    }
  }, [selectedUserSessionId])

  return (
    <div className="flex h-screen  background-white-500 ">

      {
        (!isUserSessionListOpen) ?
          <button className="m-2 self-start" onClick={(e) => {
            setIsUserSessionListOpen(!isUserSessionListOpen)
          }} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>

          </button>
          :
          <div></div>
      }
      <UserSessionListDrawer isUserSessionListOpen={isUserSessionListOpen} setIsUserSessionListOpen={setIsUserSessionListOpen} selectedUserSessionId={selectedUserSessionId} setSelectedUserSessionId={setSelectedUserSessionId}
        sendCreateUserSession={sendCreateUserSession} userSessions={userSessions}
      />

      <div className="flex flex-col flex-1 relative" >
        {
          (isUserSessionListOpen && windowSize.width !== undefined && windowSize.width <= 500) ?
            <div className="flex-1 bg-black/60 absolute h-full w-full">
            </div>

            : <div></div>
        }

        <div className="flex-1 flex flex-col self-center w-full overflow-auto" ref={chatMessagesSectionScroll}>
          <div className="flex-1 flex flex-col self-center w-full md:w-3/4">

            {
              (selectedUserSessionId === "")
                ?
                <span className="text-lg mt-3 text-center">
                  Select an existing user session or create new one by pressing plus button
                </span>
                :
                <div></div>
            }

            {
              messages.map((element: any) => {
                if (element.owner === "chatbot") {
                  return <div key={element.id} className="self-start bg-amber-500 rounded text-white text-md md:text-lg p-2 my-3 w-2/4">
                    <div>Chatbot:</div>
                    {element["content"]}
                  </div>
                }
                else if (element.owner === "user") {
                  return <div key={element.id} className="self-end rounded text-black text-md md:text-lg p-2 my-3 w-2/4 border border-slate-400" >
                    <div>You:</div>
                    {element["content"]}
                  </div>
                }

              })
            }
          </div>


        </div>
        <form className="flex justify-center  items-center "
          onSubmit={(e) => {
            e.preventDefault();
            if (!createMessageLoading && selectedUserSessionId !== "" && question.trim() !== "") {
              const questionVal: string = question;
              sendCreateMessage(serverUrl + "/message", "POST", { userSessionId: selectedUserSessionId, question: questionVal })

              setMessages((prev: any) => {
                const newMessages = [...prev, { content: questionVal, owner: "user" }]
                return newMessages;
              })
              setQuestion("")
            }
          }}>
          <div className="flex justify-center items-center w-2/4">
            <input disabled={createMessageLoading} className={(createMessageLoading) ? questionInputDisabledClass : questionInputDefaultClass} placeholder="Enter your question" value={question} onChange={(e) => { setQuestion(e.target.value) }} />
            <button type="submit" disabled={createMessageLoading} className={(createMessageLoading) ? disabledSubmitButtonClass : nonDisabledSubmitButtonClass}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
