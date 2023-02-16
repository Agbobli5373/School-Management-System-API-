
const Teacher = require('../model/Staff/Teacher')

const isTeacher = async (req, res, next) => {
    const userId = req?.useAuth?._id;
    //find a user
    const userFound = await Teacher.findById(userId);
    //check if is Teacher
    if(userFound?.role ==='teacher'){
        next()
    }
    else{
        next(new Error('Access denied , Teacher only'))
        console.log(req.useAuth);
    }

 };

module.exports = isTeacher;
