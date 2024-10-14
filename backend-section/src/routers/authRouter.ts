import express from "express";
import { register,login, silenceLogin } from "../controllers/authController";
var router = express.Router();

router.post("/register",register)

router.post("/login",login)

router.get("/silenceLogin",silenceLogin)





export default router;
