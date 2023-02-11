const bcrypt = require("bcryptjs");

//password hashing
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword ;
}

//password verification
exports.verifyPassword = async (password,hashedPassword) =>{
    return await bcrypt.compare(password, hashedPassword);
}