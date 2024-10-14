'use client'
import { useEffect, useState } from "react";

import { serverUrl } from "../../constants"

import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import useFetch from "../hooks/useFetch";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import InfoBox from "../components/InfoBox";


export default function Login() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const { isLoading, data, sendRequest, error } = useFetch({withToken: false});

    const router: AppRouterInstance = useRouter();

    useEffect(() => {

        if (data) {
          setCookie("accessToken", data.token,{maxAge: 60 * 60 * 24 * 40})
          setTimeout(() => {
            router.replace('/');
            router.refresh()
          }, 1200)
    
        }
      }, [data])
   

    useEffect(()=>{
    },[])

    return (
        <div className="flex flex-wrap justify-center md:justify-start items-center">
            <div className="flex flex-col  lg:ml-4 mt-2">
            <InfoBox isLoading={isLoading} message={data?.message} errorMessage={error?.message} messageTextClass = "" errorMessageTextClass = "" />
                <h2 className="text-amber-500 text-center text-2xl font-semibold mb-2">Login</h2>
                <div className="flex my-2 items-center">
                    <label htmlFor="username" className="w-20">Username:</label> <input type="text" id="username" name="username" value={username} onChange={(e) => { setUsername(e.target.value) }} className="ml-2 outline-none focus:border-amber-500 border-2 p-1" />
                </div>
                <div className="flex my-2 items-center">
                    <label htmlFor="password" className="w-20">Password:</label> <input type="password" id="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="ml-2 outline-none focus:border-amber-500 border-2 p-1" />
                </div>
                <div className="w-full flex items-center justify-center	">
                    <button className="bg-amber-500 text-white hover:bg-amber-600 py-3 px-6 rounded font-semibold" onClick={(e)=>{
                        if(!isLoading){
                        sendRequest(serverUrl+"/auth/login","POST",{username,password})
                        }
                    }}>Login</button>
                </div>
                {
                (isLoading) ? <span className="self-center mt-2">Loading</span> : <span></span>
                }
                <div className="self-center mt-2">Don't you have an account? <Link href={"/register"} className="underline text-blue-400 ">Register</Link></div>
                
            </div>
        </div>
    )
}