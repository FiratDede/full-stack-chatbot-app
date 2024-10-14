"use client";
import { serverUrl } from "@/constants";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSWR from 'swr'
import useFetch from "./hooks/useFetch";
import Link from "next/link";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const [answer, setAnswer] = useState<string>("");

  const [userSessionIds, setUserSessionIds] = useState<Array<string>>([])

  const { isLoading: getAllUserSessionIdsLoading, data: getAllUserSessionIdsData, sendRequest: sendGetAllUserSessionIds, error: getAllUserSessionIdsError } = useFetch({ withToken: true });

  const { isLoading: getUserSessionLoading, data: userSession, sendRequest: sendGetUserSession, error: getUserSessionError } = useFetch({ withToken: true });

  const { isLoading: giveAnswerLoading, data: giveAnswerData, sendRequest: sendGiveAnswer, error: giveAnswerError } = useFetch({ withToken: true });


  const { isLoading: createUserSessionLoading, data: createUserSessionData, sendRequest: sendCreateUserSession, error: createUserSessionError } = useFetch({ withToken: true });


  const [selected, setSelected] = useState<any>(null);



  const isFirstFetch = useRef(true)

  const chatMessagesSectionScroll = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    sendGetAllUserSessionIds(serverUrl + "/userSession/all/ids", "GET", {})
  }, [])
  useEffect(() => {
    if (userSession) {
      setSelected(userSession)
    }

  }, [userSession])

  useEffect(() => {
    if (giveAnswerData) {
      setSelected((prev: any) => {
        const newSelected = { ...prev }
        newSelected.questionsAndAnswers = [...newSelected.questionsAndAnswers, giveAnswerData.formattedAnswer, giveAnswerData.newQuestion]

        return newSelected
      })

    }

  }, [giveAnswerData])

  useEffect(() => {
    if (createUserSessionData) {
      setUserSessionIds((prev: any) => {
        const newUserSessionIds = [createUserSessionData, ...prev]
        return newUserSessionIds
      })
    }

  }, [createUserSessionData])


  useEffect(() => {
    if (chatMessagesSectionScroll.current) {
      chatMessagesSectionScroll.current.scrollTo(0, chatMessagesSectionScroll.current.scrollHeight);
    }

  }, [selected])

  useEffect(() => {
    if (getAllUserSessionIdsData) {
      setUserSessionIds(getAllUserSessionIdsData)
    }

  }, [getAllUserSessionIdsData])

  return (
    <div className="flex h-screen  background-white-500 ">
      <div className="flex flex-col border-2 py-3 px-1">
        <button className="self-end" onClick={(e) => {
          sendCreateUserSession(serverUrl + "/userSession", "POST", {})
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>

        <div className="flex flex-col flex-1">

          {
            userSessionIds?.map((userSessionId: any, index: number) => {

              return (
                <button onClick={(e) => {
                  sendGetUserSession(serverUrl + "/userSession?id=" + userSessionId, "GET", {})

                }}>

                  <div className={(userSessionId !== selected?._id) ? "p-2 border-b-2 border-slate-300 	" : "p-2 border-b-2 border-white bg-amber-500 text-white"} key={userSessionId}>User Session {userSessionIds.length - index}</div>

                </button>
              )
            })
          }
        </div>
        <Link href="/logout" className="self-start">Logout</Link>

      </div>
      <div className="flex flex-col flex-1">

        <div className="flex-1 flex flex-col self-center w-full md:w-2/4   overflow-auto" ref={chatMessagesSectionScroll}>
          {
            (selected === null)
              ?
              <span className="text-lg mt-3 text-center">
                Select an existing user session or create new one by pressing plus button
              </span>
              :
              <div></div>
          }

          {
            selected?.questionsAndAnswers.map((element: any) => {
              if (element.kind === "Answer") {

                return <div className="self-start bg-amber-500 rounded text-white text-md md:text-lg p-2 my-3 w-2/4">{element["content"]}</div>
              }
              else if (element.kind === "Question") {
                return <div className="self-end rounded text-black text-md md:text-lg p-2 my-3 w-2/4 border border-slate-400" >{element["content"]}</div>
              }

            })
          }

        </div>
        <form className="flex justify-center  items-center"
          onSubmit={(e) => {
            e.preventDefault();
            if (selected) {
              sendGiveAnswer(serverUrl + "/userSession/giveAnswer", "PUT", { answer: answer, userSessionId: selected._id })
              setAnswer("")
            }
          }}>
          <div className="flex justify-center items-center w-2/4">
            <input className="min-w-56 my-2 py-4 px-2 flex-1  outline-none focus:border-amber-500 border-slate-400 border rounded" placeholder="Enter your answer" value={answer} onChange={(e) => { setAnswer(e.target.value) }} />
            <button type="submit" className="border border-slate-400 ml-2 p-4 bg-amber-500 text-white rounded" >Send</button>

          </div>

        </form>
      </div>

    </div>
  );
}
