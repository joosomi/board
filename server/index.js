const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const config = require("./config/key");
const userRoutes = require("./routes/userRoutes");
const boardRoutes = require("./routes/boardRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트 도메인으로 설정
    credentials: true, // 사용자 인증이 필요한 리소스 접근
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "somi",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 5300000,
    },
  })
);

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 라우팅
app.get("/", (req, res) => res.send("Hello World"));

app.use("/users", userRoutes);
app.use("/board", boardRoutes);
app.use("/comment", commentRoutes);

const PORT = process.env.PORT || 5000;

http.createServer(app).listen(PORT, () => {
  console.log(`Server open : ${PORT}!`);
});
