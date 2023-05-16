require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const db = require("./config/db");
const PORT = process.env.PORT;
// const userExtractor = require("./middleware/userExtractor");

const {
  postRouter,
  userRouter,
  authRouter,
  uploadRouter
} = require("./routers");

const routes = require('./routes');

db.connect((err) => {
  if (err) return console.error(err);
  console.log("Connected to MySQL");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bearerToken())

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/upload", uploadRouter);
app.use("/api", routes)
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
