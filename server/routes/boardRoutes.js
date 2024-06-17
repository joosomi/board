const express = require("express");
const router = express.Router();
const Cboard = require("../controllers/Cboard");

router.post("/write", Cboard.write);

router.get("/post/:id", Cboard.getPost);

router.get("/posts", Cboard.getAllPosts);

module.exports = router;
