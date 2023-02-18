const verifyToken = require("../utils/verifyToken");
const Student = require("../model/Academics/Student");

const isStudentLogin = async (req, res, next) => {
  try {
    //get Token  from header
    const headerObject = req.headers;
    const token = headerObject?.authorization.split(" ");

    //verify token
    const verifiedToken = verifyToken(token);

    if (verifiedToken) {
      const user = await Student.findById(verifiedToken.id).select("email name");
      //save the user into req.body
      req.useAuth = user;
      next();
    } else {
      const err = new Error("Token Expired");
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = isStudentLogin;
