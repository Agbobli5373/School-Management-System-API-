const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "anykey", { expiresIn: "24h" });
};


module.exports = generateToken;
