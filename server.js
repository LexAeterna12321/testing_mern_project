const express = require("express");
const user = require("./routes/api/user");
const app = express();

app.use("/api/users", user);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
