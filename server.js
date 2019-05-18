const express = require("express");
const users = require("./routes/api/users");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
