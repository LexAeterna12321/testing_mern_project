const express = require("express");
const connectDB = require("./config/db");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const messages = require("./routes/api/messages");
const socket = require("socket.io");
const path = require("path");

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/chat", messages);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// const server = app.listen(PORT, () =>
//   console.log(`Listening on PORT: ${PORT}`)
// );
// const io = socket(server);

// let typingUsers = [];

// io.on("connection", socket => {
//   socket.on("chat", function(data) {
//     io.sockets.emit("chat", JSON.parse(data));
//   });

//   socket.on("typing", function(data) {
//     const parsedData = JSON.parse(data);
//     if (parsedData.typing) {
//       const filtered = typingUsers.filter(user => {
//         return user.userName === parsedData.userName;
//       });
//       filtered.length > 0 ? null : typingUsers.push(parsedData);
//     } else {
//       typingUsers = typingUsers.filter(
//         user => user.userName !== parsedData.userName
//       );
//     }
//     socket.broadcast.emit("typing", typingUsers);
//   });

// socket.on("userConnect", function(data) {
//   const parsedData = JSON.parse(data);

//   const userName = parsedData.userName;
//   console.log({ data, parsedData });
//   socket.broadcast.emit("userConnect", parsedData);
// });

// socket.on("disconnect", function(data) {
//   const parsedData = JSON.parse(data);
//   const userName = parsedData.userName;
//   console.log({ data, parsedData });
//   console.log(`${userName} disconnected...`);
//   socket.broadcast.emit("userDisconnect", userName);
// });
// });
