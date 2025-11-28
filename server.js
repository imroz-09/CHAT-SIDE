const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("A user connected");

    // receive message from user
    socket.on("chatMessage", (msg) => {
        io.emit("message", msg); // broadcast to all users
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

const PORT = 3000;
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
