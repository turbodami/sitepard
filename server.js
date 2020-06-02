const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect db
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("api running"));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/site", require("./routes/api/site"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server ${PORT}`));
