import express from "express";
import {  createUserSession, getAllUserSessionIds, getUserSession, getUserSessionAll } from "../controllers/userSessionController";
import checkAuth from "../middlewares/checkAuth";

var router = express.Router();

router.use(checkAuth);

router.get("/",getUserSession);

router.get("/all",getUserSessionAll);

router.get("/all/ids",getAllUserSessionIds);

router.post("/",createUserSession);

export default router;