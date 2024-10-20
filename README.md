# Full Stack Chatbot App
This repo includes source code of a chatbot app.

**Important**: This app uses **Gemini API**, you must have a gemini API key for using this application. You have to create a `.env` file in `/backend-section` directory in the format below:
```
SECRET_KEY = your_secret_key
GEMINI_API_KEY = your_gemini_api_key
MONGODB_URI = your_mongodb_uri
```
## Used Technologies
**Frontend:** Typescript, Nextjs, Tailwindcss

**Backend:** Typescript, Express.js, Mongodb
## How to Run
**Frontend:**
* Execute the command the below in **/frontend-section** directory to run frontend in **dev** mode.

  `npm install && npm run dev`
* Execute the command the below in **/frontend-section** directory to run frontend in **product** mode.

  `npm install && npm run build && npm run start`

**Backend:**
* Execute the command the below in **/backend-section** directory to run backend in **dev** mode.
  
  `npm install && npm run dev`
* Execute the command the below in **/backend-section** directory to run backend in **product** mode.

  `npm install && npm run build && npm run start`
## Demo
https://github.com/user-attachments/assets/844d2669-c95f-4462-b316-b5e6ac2821a4

