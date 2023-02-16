const verifyToken = require("../utils/verifyToken");
const Teacher = require("../model/Staff/Teacher");

const isTeacherLogin = async (req, res, next) => {
  //get token from header
  const headerObject = req.headers;
  const token = headerObject?.authorization?.split(" ")[1];
  console.log(token);
  //verify token
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    const user = await Teacher.findById(verifiedToken.id).select(
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

module.exports = isTeacherLogin;
