const express = require("express");
const connectDB = require("./config/db");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const messages = require("./routes/api/messages");
const socket = require("socket.io");
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/chat", messages);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Listening on PORT: ${PORT}`)
);
const io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);
  socket.on("chat", function(data) {
    io.sockets.emit("chat", JSON.parse(data));
  });
  socket.on("typing", function(data) {
    const rawData = JSON.parse(data);
    const userName = rawData.userName;
    console.log(`${userName} is typing...`);

    socket.broadcast.emit("typing", JSON.parse(data));
  });
  socket.on("userConnect", function(data) {
    socket.broadcast.emit("userConnect", data);
  });

  socket.on("userDisconnect", function(data) {
    socket.broadcast.emit("userDisconnect", data);
  });
});
