import { Secret } from "jsonwebtoken"

if (process.env.SECRET_KEY === undefined) {
    throw new Error(`SECRET_KEY env variable is undefined.
    Please create .env file in /backend-section directory and set this variable.
    For more details read README.md file.`)
}
export const secretKey: Secret = process.env.SECRET_KEY


if (process.env.GEMINI_API_KEY === undefined) {
    throw new Error(`GEMINI_API_KEY env variable is undefined.
    Please create .env file in /backend-section directory and set this variable.
    For more details read README.md file.`)
}
export const apiKey: string = process.env.GEMINI_API_KEY


if (process.env.MONGODB_URI === undefined) {
    throw new Error(`MONGODB_URI env variable is undefined.
        Please create .env file in /backend-section directory and set this variable.
        For more details read README.md file.`)
}

export const mongoDbUri: string = process.env.MONGODB_URI