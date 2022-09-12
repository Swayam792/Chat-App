import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messagesRoute.js";
import {Server} from "socket.io";

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

mongoose.connect(MONGO_URL)
.then(() => {
    console.log("Database connnected");
}).catch((err) => {
    console.log(err.message);
})

const server = app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            
            socket.to(sendUserSocket).emit("msg-received", data.messages);
        }
    })
})
