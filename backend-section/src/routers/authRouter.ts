import express, { Router } from "express";
import { register,login, silenceLogin } from "../controllers/authController";
import { catchErrorWrapper } from "../helpers/errorHelpers";
var router: Router = express.Router();

router.post("/register",catchErrorWrapper(register))

router.post("/login",catchErrorWrapper(login))

router.get("/silenceLogin",silenceLogin)





export default router;
