const verifyToken = require("../utils/verifyToken");
const Admin = require("../model/Staff/Admin");

const isLogin = async (req, res, next) => {
  //get token from header
  const headerObject = req.headers;
  const token = headerObject?.authorization?.split(" ")[1];
  //console.log(token);
  //verify token
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    const user = await Admin.findById(verifiedToken.id).select(
      "email name role"
    );
    //save the user into req.body
    req.useAuth = user;
    next()
   
  } else {
    const err = new Error("Token Expired");
    next(err);
  }
};

module.exports = isLogin;
