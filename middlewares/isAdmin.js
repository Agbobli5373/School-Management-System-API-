
const Admin = require('../model/Staff/Admin')

const isAdmin = async (req, res, next) => {
    const userId = req?.useAuth?._id;
    //find a user
    const userFound = await Admin.findById(userId);
    //check if is Admin
    if(userFound?.role ==='admin'){
        next()
    }
    else{
        next(new Error('Access denied , Admin only'))
    }

 };

module.exports = isAdmin;
