import { getCookie, setCookie } from "cookies-next";
import { useState } from "react";
import { parseDataAccordingToContentType } from "@/helpers";



export default function useFetch({ withToken = true }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const sendRequest = async (url: string, method: string = "GET", data: Object,) => {
        let responseData = null;
        setIsLoading(true)
        setData(null);
        setError(null);
        try {
            let requestHeaders = { "Content-Type": "application/json", "Authorization": "" }
            if (withToken) {
                requestHeaders["Authorization"] = "Bearer " + getCookie("accessToken")
            }

            method = method.toUpperCase()

            const requestOptions = { headers: requestHeaders, method: method, body: method === "POST" || method === "PUT" ? JSON.stringify(data) : undefined }

            const response = await fetch(url, requestOptions)
            if (response.ok) {
                responseData = await parseDataAccordingToContentType(response);
                setData(responseData);
                setError(null)
            }
            else {
                responseData = await parseDataAccordingToContentType(response);
                if (typeof responseData === 'string' && responseData === "Jwt Token Expired") {
                    console.log("Jwt Token Expired");
                  
                }
                setError(responseData)
                setData(null)
            }
        }
        catch (err) {
            console.log("err: " + err)
            setError("Unexpected An Error Occurred")
            setData(null)
        }

        setIsLoading(false);
    }

    return { isLoading, data, sendRequest, error };

}