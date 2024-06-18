const { Comment } = require("../models/Comment");

//댓글 작성하기
exports.writeComment = async (req, res) => {
  try {
    // console.log(req.body);

    const user = req.user;

    if (!user) {
    }
    const { boardId, content } = req.body;

    const newComment = new Comment({
      boardId,
      content,
      author: user.id,
    });

    await newComment.save();

    res.send({
      success: true,
      msg: "댓글이 작성되었습니다.",
      comment: newComment,
    });
  } catch (err) {
    res.send({ success: false, msg: "다시 시도해주세요." });
    console.log(err);
  }
};

// 특정 게시글의 모든 댓글 가져오기
exports.getCommentsByBoard = async (req, res) => {
  try {
    const { id: boardId } = req.params;

    const comments = await Comment.find({ boardId }).sort({ createdAt: -1 });

    res.send(comments);
    console.log(comments);
    //댓글이 없을 경우 예외처리
  } catch (error) {
    // console.log(error);
    res.send({
      success: false,
      message: "댓글을 가져오는 데 실패했습니다.",
      error,
    });
  }
};
