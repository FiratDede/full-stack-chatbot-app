import { serverUrl } from "@/constants";
import Link from "next/link";
import "./UserSessionListDrawer.css"
import { useState } from "react";

type UserSessionListDrawerProps = {
    isUserSessionListOpen: boolean;
    setIsUserSessionListOpen: Function;
    userSessions: Array<any>;
    selectedUserSessionId: string;
    setSelectedUserSessionId: Function;
    sendCreateUserSession: Function;
};

const UserSessionListDrawer: React.FC<UserSessionListDrawerProps> = ({ isUserSessionListOpen, setIsUserSessionListOpen, userSessions,
    selectedUserSessionId, setSelectedUserSessionId, sendCreateUserSession, }) => {

    const openUserSessionListClass: string = "flex flex-col border-2 py-3 px-1 user-session-list"
    const closedUserSessionListClass: string = "flex flex-col border-2 py-3 px-1 user-session-list user-session-list-hide "

    return (
        <div id="userSessionsList"
            className={(isUserSessionListOpen) ? openUserSessionListClass : closedUserSessionListClass} >

            <div className="flex justify-between my-1 ">
                <button onClick={(e) => {
                    setIsUserSessionListOpen(!isUserSessionListOpen)
                }} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>

                </button>

                <button className="self-end" onClick={(e) => {
                    sendCreateUserSession(serverUrl + "/userSession", "POST", {})
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>

            </div>


            <div className="flex flex-col flex-1  overflow-auto">

                {
                    userSessions?.map((userSession: any, index: number) => {

                        return (
                            <button onClick={(e) => {
                                console.log(userSession)
                                setSelectedUserSessionId(userSession._id)

                            }}>

                                <div className={(userSession._id !== selectedUserSessionId) ? "p-2 border-b-2 border-slate-300" : "p-2 border-b-2 border-white bg-amber-500 text-white"} key={userSession._id}>User Session {userSession.titleNo}</div>

                            </button>
                        )
                    })
                }
            </div>
            <Link href="/logout" className="self-start">Logout</Link>

        </div>

    )
}

export default UserSessionListDrawer