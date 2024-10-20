import express, { Router } from "express";
import { getAllMessages, insertMessage } from "../controllers/messageController";
import checkAuth from "../middlewares/checkAuth";

var router: Router = express.Router();

router.use(checkAuth);

router.get("/all",getAllMessages)


router.post("/",insertMessage)

export default router;