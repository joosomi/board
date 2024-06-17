const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const userRoutes = require("./routes/userRoutes");

const boardRoutes = require("./routes/boardRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
    credential: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//라우팅
app.get("/", (req, res) => res.send("Hello World"));

app.use("/users", userRoutes);
app.use("/board", boardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server open : ${PORT}!`);
});
