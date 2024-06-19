const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 비밀번호 암호화
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = async function (plainPassword) {
  const isMatch = await bcrypt.compare(plainPassword, this.password);
  return isMatch;
  //입력된 비번, db에 저장된 비번 - 일치하는지 확인
};

// 토큰 생성 메서드
userSchema.methods.generateToken = async function () {
  try {
    const payload = {
      _id: this._id.toHexString(),
      id: this.id,
    };

    const token = jwt.sign(payload, "secretToken", { expiresIn: "1h" }); // 1시간 유효기간 설정
    this.token = token;

    // 토큰 유효기간 설정 (예: 현재 시간 + 1시간)
    const oneHour = 60 * 60 * 1000;
    this.tokenExp = Date.now() + oneHour;

    await this.save();
    return this;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.statics.findByToken = async function (token) {
  try {
    //유저 아이디 이용해서 유저 찾고
    const decoded = jwt.verify(token, "secretToken");
    //client token과 db 보관된 토큰 일치하는지 체크 - decode된 토큰 return

    const user = await this.findOne({ _id: decoded, token: token });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
