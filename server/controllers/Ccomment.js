const { Comment } = require("../models/Comment");
const { Board } = require("../models/Board");

//댓글 작성하기
exports.writeComment = async (req, res) => {
  try {
    // console.log(req.body);

    const user = req.user;

    if (!user) {
    }
    const { boardId, content, parentCommentId } = req.body;

    const newComment = new Comment({
      boardId,
      content,
      author: user.id,
      parentCommentId: parentCommentId || null,
    });

    await newComment.save();

    //댓글 수 증가
    await Board.findByIdAndUpdate(boardId, { $inc: { commentCount: 1 } });

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
// exports.getCommentsByBoard = async (req, res) => {
//   try {
//     const { id: boardId } = req.params;

//     const comments = await Comment.find({ boardId }).sort({ createdAt: -1 });

//     res.send(comments);
//     // console.log(comments);
//     //댓글이 없을 경우 예외처리
//   } catch (error) {
//     // console.log(error);
//     res.send({
//       success: false,
//       message: "댓글을 가져오는 데 실패했습니다.",
//       error,
//     });
//   }
// };

// 특정 게시글의 모든 댓글 가져오기
exports.getCommentsByBoard = async (req, res) => {
  try {
    const { id: boardId } = req.params;

    const comments = await Comment.find({ boardId }).sort({
      createdAt: 1,
    });

    const constructCommentTree = (comments, parentId = null) => {
      return comments
        .filter(
          (comment) =>
            comment.parentCommentId?.toString() === parentId?.toString()
        )
        .map((comment) => ({
          ...comment.toObject(),
          replies: constructCommentTree(comments, comment._id),
        }));
    };

    const commentTree = constructCommentTree(comments);

    res.send(commentTree);
  } catch (error) {
    res.send({
      success: false,
      message: "댓글을 가져오는 데 실패했습니다.",
      error,
    });
  }
};

//내가 쓴 댓글 가져오기
exports.getCommentByUserId = async (req, res) => {
  try {
    const user = req.user;

    const comments = await Comment.find({ author: user.id });
    // console.log(posts);
    if (!comments) {
      return res.send({
        success: false,
        message: "댓글을 찾을 수 없습니다.",
      });
    }

    res.send({ success: true, data: posts });
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: "서버 에러" });
  }
};

//본인이 쓴 댓글 삭제
exports.deleteComment = async (req, res) => {
  try {
    const user = req.body.id;
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.send({
        success: false,
        msg: "댓글이 존재하지 않습니다.",
      });
    }

    if (comment.author !== user) {
      return res.send({
        success: false,
        msg: "본인의 댓글만 삭제할 수 있습니다.",
      });
    }

    // isDeleted를 true로 설정
    comment.isDeleted = true;
    await comment.save();

    await Board.findByIdAndUpdate(comment.boardId, {
      $inc: { commentCount: -1 },
    });

    return res.send({
      success: true,
      msg: "댓글이 삭제되었습니다.",
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
};

//댓글 수정하기
exports.updateComment = async (req, res) => {
  try {
    const user = req.user;
    const commentId = req.params.commentId;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.send({
        success: false,
        msg: "댓글이 존재하지 않습니다.",
      });
    }

    if (comment.author !== user.id) {
      return res.send({
        success: false,
        msg: "본인의 댓글만 수정할 수 있습니다.",
      });
    }

    // 댓글 내용 수정
    comment.content = content;
    await comment.save();

    return res.send({
      success: true,
      msg: "댓글이 수정되었습니다.",
      comment,
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
};
