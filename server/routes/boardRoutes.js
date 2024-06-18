const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Cboard = require("../controllers/Cboard");

router.post("/write", auth, Cboard.write);

// router.post("/write", Cboard.write);

router.get("/post/:id", Cboard.getPost);

router.get("/posts", Cboard.getAllPosts);

module.exports = router;
