const { Board } = require("../models/Board");

// 글 작성
exports.write = async (req, res) => {
  try {
    const user = req.user;
    // console.log("write : ", user);

    const newPost = new Board({
      title: req.body.title,
      content: req.body.content,
      author: user.id,
    });

    await newPost.save();
    return res.send({ success: true, post: newPost });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, error: "다시 시도해주세요." });
  }
};

// 개별 글 가져오기
exports.getPost = async (req, res) => {
  try {
    const boardId = req.params.id;
    const post = await Board.findById(boardId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "게시글이 존재하지 않습니다." });
    }

    return res.send({ success: true, post });
  } catch (err) {
    return res.send({ success: false, error: err.message });
  }
};

// 전체 글 가져오기
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Board.find();

    return res.send({ success: true, posts });
  } catch (err) {
    return res.send({ success: false, error: err.message });
  }
};

//본인이 쓴 글이라면 삭제
exports.deletePost = async (req, res) => {
  try {
    const user = req.body.id;
    const boardId = req.params.id;
    const post = await Board.findById(boardId);

    // console.log(user);
    // console.log(boardId);
    // console.log(post);

    if (!post) {
      return res.send({
        success: false,
        msg: "게시글이 존재하지 않습니다.",
      });
    }

    if (post.author.toString() !== user.toString()) {
      return res.send({
        success: false,
        msg: "본인의 글만 삭제할 수 있습니다.",
      });
    }

    await Board.findByIdAndDelete(boardId);

    return res.send({
      success: true,
      msg: "게시글이 삭제되었습니다.",
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
};
