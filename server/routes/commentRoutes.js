const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const Ccomment = require("../controllers/Ccomment");

//댓글 생성
router.post("/write", auth, Ccomment.writeComment);

//특정 게시글의 모든 댓글 가져오기
router.get("/:id", Ccomment.getCommentsByBoard);

//댓글 삭제
router.post("/:commentId", Ccomment.deleteComment);

//특정 유저의 댓글 가져오기
// router.get("/user", auth, Ccomment.getCommentByUserId);

//댓글 업데이트
router.put("/:commentId", auth, Ccomment.updateComment);

module.exports = router;
