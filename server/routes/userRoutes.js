const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Cuser = require("../controllers/Cuser");

router.post("/join", Cuser.join);
router.post("/login", Cuser.login);

router.get("/logout", auth, Cuser.logout);

router.get("/auth", auth, Cuser.auth);

module.exports = router;
