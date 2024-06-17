const { User } = require("../models/User");

//회원가입
exports.join = async (req, res) => {
  try {
    const existingUser = await User.findOne({ id: req.body.id });

    if (existingUser) {
      return res.send({
        success: false,
        message: "이미 존재하는 아이디입니다.",
      });
    }

    const user = new User(req.body);
    const userInfo = await user.save();

    return res.status(200).json({ success: true, userInfo });
  } catch (err) {
    console.error(err);
    return res.send({
      success: false,
      message: "회원가입 중 오류가 발생하였습니다.",
    });
  }
};

//로그인
exports.login = async (req, res) => {
  try {
    console.log(req.body);

    const user = await User.findOne({ id: req.body.id });

    if (!user) {
      return res.send({
        loginSuccess: false,
        message: "해당하는 아이디의 유저가 없습니다.",
      });
    }

    console.log("유저 찾음", user);

    const userPW = req.body.password;
    const isMatch = await user.comparePassword(userPW);

    console.log("비밀번호 비교 결과:", isMatch);

    if (!isMatch) {
      return res.send({
        loginSuccess: false,
        message: "비밀번호를 다시 확인해주세요.",
      });
    }

    const tokenUser = await user.generateToken();

    return res.json({
      loginSuccess: true,
      token: tokenUser.token,
      userId: tokenUser._id,
    });
  } catch (err) {
    console.error(err);
    return res.send({
      loginSuccess: false,
      message: "에러가 발생했습니다.",
    });
  }
};

//*********************************//
exports.auth = (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    id: req.user.id,
    role: req.user.role,
  });
};

exports.logout = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).send({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};
