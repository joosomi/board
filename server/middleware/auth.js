const { User } = require("../models/User");

let auth = async (req, res, next) => {
  try {
    // 클라이언트 쿠키에서 토큰 가져오기
    let token = req.cookies.x_auth;

    // console.log(token);

    // 토큰을 복호화한 후 유저 찾기
    let user = await User.findByToken(token);

    // 유저가 없으면 인증 실패
    if (!user) {
      return res.status(401).json({ isAuth: false, error: true });
    }

    // 유저가 있으면 인증 성공
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.send({ isAuth: false, error: true });
  }
};

module.exports = { auth };
