import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} mapped to socket ${socket.id}`);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));  // ✅ Fixed capitalization

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        
        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };
