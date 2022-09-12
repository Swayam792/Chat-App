import express from "express";
import { addMsg, getAllMsg } from "../controllers/messagesController.js";

const messageRouter = express.Router();

messageRouter.post("/addmsg", addMsg);
messageRouter.post("/getmsg", getAllMsg);
 
export default messageRouter;