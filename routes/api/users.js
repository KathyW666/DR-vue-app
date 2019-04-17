// @login & register
const express = require("express");
const router = express.Router();

// $route GET api/users/test
// @desc  返回请求的json数据
// @acess public
router.get("/test",(request, response) => {
    response.json({msg:"login works"});
});

module.exports = router;
