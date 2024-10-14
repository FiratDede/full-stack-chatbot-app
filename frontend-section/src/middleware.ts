import { NextResponse, NextRequest } from 'next/server'
import { CookieValueTypes, deleteCookie, getCookie, setCookie } from 'cookies-next';
import { serverUrl } from './constants';
import { NextURL } from 'next/dist/server/web/next-url';


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const url: NextURL = request.nextUrl.clone();

    const oldPathName: string = url.pathname;

    let accessToken: CookieValueTypes = getCookie("accessToken", { req: request, });

    let accessTokenStringForm: string | undefined = accessToken?.toString();
    if (accessTokenStringForm === undefined) {
        accessTokenStringForm = "";
    }

    try {

        let silenceLoginResponse = await fetch(serverUrl + "/auth/silenceLogin", { method: "GET", headers: { "authorization": "Bearer: " + accessTokenStringForm } })
        if (silenceLoginResponse.ok === false) {
            throw new Error("Unauthorized")

        }
        else {

            let decodedToken = await silenceLoginResponse.json();

            let response: NextResponse

            if (oldPathName.startsWith("/login") || oldPathName.startsWith("/register")) {
                url.pathname = "/"
                response = NextResponse.redirect(url)
            }
            else {
                response = NextResponse.next();
            }

             response.headers.set('Username', decodedToken.username,);



            return response;

        }
    }
    catch (err) {
        if (oldPathName.startsWith("/login") || oldPathName.startsWith("/register")  || oldPathName.startsWith("/_next")) {
            return NextResponse.next();
        }
        else {
            url.pathname = "/login"

            return NextResponse.redirect(url)

        }

    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logout).*)',
    ]
}