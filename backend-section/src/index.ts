require('dotenv').config()
import express, { Request, Response } from "express";
import {connectDb} from "./config/db";
import userSessionRouter from "./routers/userSessionRouter"
import authRouter from "./routers/authRouter"
import checkAuth from "./middlewares/checkAuth";

const cors = require('cors');

const app = express()

const port = process.env.port || 3001
const path = require('path');

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
})); // Cors middleware

app.use(express.json()); // JSON parser middleware




app.use('/api/auth', authRouter)

app.use('/api/userSession', userSessionRouter)



app.listen(port,async () => {
  console.log(`Example app listening on port ${port}`)
  await connectDb()
})