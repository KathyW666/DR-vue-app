// @login & register
const express = require("express");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const router = express.Router();

const User = require("../../models/User");

/**
 * $route GET api/users/test
 * @desc  返回请求的json数据
 * @acess public
 * @type {[type]}
 */
router.get("/test", (req, res) => {
  res.json({ msg: "login works" });
});

/**
 * $route POST api/users/register
 * @desc  返回请求的json数据
 * @acess public
 */
router.post("/register", (req, res) => {
  // console.log(req.body);
  // 查询数据库中是否有email
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json("邮箱已注册!");
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newUser = new User({
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
          avatar,
          identity: req.body.identity
        });
        bcrypt.genSalt(10, function(err, salt) {
          // console.log(newUser);
          // 后端逻辑可能存在的问题：password为空
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

/**
 * $route POST api/users/login
 * @desc  返回token jwt passport
 * @acess public
 */
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json("用户不存在!");
    }

    // 密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // 生成token，若成功：返回token
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity
        };
        jwt.sign(
          rule,
          keys.secretOrKey,
          { expiresIn: 3600 * 3 },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json("密码错误!");
      }
    });
  });
});

/**
 * $route GET api/users/current
 * @desc  return current user
 * @acess private (need token)
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.indentity
    });
  }
);

module.exports = router;
