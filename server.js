const express = require("express");
const connectDB = require("./config/db");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", users);
app.use("/api/auth", auth);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
