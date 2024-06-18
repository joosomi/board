const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Cboard = require("../controllers/Cboard");

router.post("/write", auth, Cboard.write);

router.get("/post/:id", Cboard.getPost);

router.get("/posts", Cboard.getAllPosts);

router.post("/post/:id", Cboard.deletePost);
//axios-delete 요청은 data 필드를 사용할 수 없어서 post 요청으로 수정함

module.exports = router;
