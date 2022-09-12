import express from "express";
import { getAllUsers, login, register, setAvatar } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/setavatar/:id", setAvatar); 
userRouter.get("/allusers/:id", getAllUsers);

export default userRouter;