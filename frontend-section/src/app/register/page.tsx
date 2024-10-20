'use client'
import { useEffect, useState } from "react";
import { serverUrl } from "../../constants"
import useFetch from "../hooks/useFetch";
import { useRouter } from 'next/navigation';
import { setCookie } from "cookies-next";
import InfoBox from "../components/InfoBox";


export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { isLoading, data, sendRequest, error } = useFetch({ withToken: false });

    const router = useRouter();

    useEffect(() => {
        if (data) {
            setCookie("accessToken", data.token, { maxAge: 60 * 60 * 24 * 40 })
            setTimeout(() => {
                router.replace('/');
                router.refresh()
            }, 1200)

        }
    }, [data])

    return (
        <div className="flex flex-wrap justify-center md:justify-start items-center">
            <div className="flex flex-col  lg:ml-4 mt-2 self-start ">
                <InfoBox isLoading={isLoading} message={data?.message} errorMessage={error} messageTextClass="" errorMessageTextClass="" />
                <h2 className="text-amber-500 text-center text-2xl font-semibold mb-2">Register</h2>
                <div className="flex my-2 items-center">
                    <label htmlFor="username" className="w-20">Username:</label> <input type="text" id="username" name="username" value={username} onChange={(e) => { setUsername(e.target.value) }} className="ml-2 outline-none focus:border-amber-500 border-2 p-1" />
                </div>
                <div className="flex my-2 items-center">
                    <label htmlFor="password" className="w-20">Password:</label> <input type="password" id="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="ml-2 outline-none focus:border-amber-500 border-2 p-1" />
                </div>
                <div className="w-full flex items-center justify-center	">
                    <button className="bg-amber-500 text-white hover:bg-amber-600 py-3 px-6 rounded font-semibold" onClick={(e) => {
                        if (!isLoading) {
                            sendRequest(serverUrl + "/auth/register", "POST", { username, password })
                        }
                    }}>Register</button>
                </div>
            </div>


        </div>
    )
}