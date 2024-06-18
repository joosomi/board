const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const Ccomment = require("../controllers/Ccomment");

//댓글 생성
router.post("/write", auth, Ccomment.writeComment);

//특정 게시글의 모든 댓글 가져오기
router.get("/:id", Ccomment.getCommentsByBoard);

//댓글 업데이트
// router.get("/posts", Cboard.updateComment);

//댓글 삭제
// router.delete("/:commentId", Ccomment.deleteComment);

module.exports = router;
