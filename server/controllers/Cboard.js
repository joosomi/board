const { Board } = require("../models/Board");

// 글 작성
exports.write = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id; // 인증된 사용자의 ID를 작성자로 설정

    const newPost = new Board({
      title,
      content,
      author,
    });

    await newPost.save();
    return res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

// 개별 글 가져오기
exports.getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Board.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({ success: true, post });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

// 전체 글 가져오기
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Board.find();

    return res.status(200).json({ success: true, posts });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
