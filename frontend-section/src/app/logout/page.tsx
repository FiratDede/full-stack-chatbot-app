'use client'
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        deleteCookie("accessToken")
        router.replace("/")
        router.refresh();
    }, [])

    return <></>
}