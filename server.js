const express = require("express");
const connectDB = require("./config/db");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const socket = require("socket.io");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", users);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Listening on PORT: ${PORT}`)
);

const io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", function(data) {
    console.log(`${data.user} is typing...`);
    if (data.message.trim() !== "") {
      socket.broadcast.emit("typing", `${data.user} is typing...`);
    } else {
      socket.broadcast.emit("typing", "");
    }
  });
  socket.on("userConnect", function(data) {
    socket.broadcast.emit("userConnect", data);
  });

  socket.on("userDisconnect", function(data) {
    socket.broadcast.emit("userDisconnect", data);
  });
});
