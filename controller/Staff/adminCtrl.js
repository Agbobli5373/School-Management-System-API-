const mongoose = require("mongoose");
const Admin = require("../../model/Staff/Admin");
const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");


//Desc Register controller
//@route POST /api/v1/admin/register
//@access Private
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //checking if email exit
  const userFound = await Admin.findOne({ email });
  if (userFound) {
    //return res.json({ message: "Admin Exited" });
    throw new Error("Admins Exits");
  }
  //register
  const user = await Admin.create({
    email,
    password,
    name,
  });
  res.status(201).json({
    status: "Success",
    data: user,
  });
});

//Desc Login controller
//@route POST /api/v1/admin/login
//@access Private
exports.loginAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //checking if email exit
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.json({
      message: "Invalid Login crendetial",
    });
  }
  if (user && (await user.verifyPassword(password))) {
    //assigning generated token
    const token = generateToken(user._id);
    // verifying token
    const verify = verifyToken(token);
    console.log(verify);
    return res.json({
      data: generateToken(user._id),
      user,
      verify,
    });
  } else {
    return res.json({
      message: "Invalid Login crendetial",
    });
  }
});

//Desc Get Admins  controller
//@route GET /api/v1/admin/
//@access Private
exports.getAdmins = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: "All Admins ",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
//Desc Get Single Admin  controller
//@route GET /api/v1/admin/:adminID
//@access Private
exports.getSingleAdmin = AsyncHandler(
  async ( req, res ) => {
      console.log(req.useAuth)
      res.status(201).json({
        status: "success",
        data: "Single Admins",
    
      });
    }
)

//Desc Update Admin  controller
//@route PUT /api/v1/admin/:adminID
//@access Private
exports.updateAdmin = async (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Update Admins",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};
//Desc Delete Admin  controller
//@route DELETE /api/v1/admin/:adminID
//@access Private
exports.deleteAdmin = async (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Delete Admins",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

//Desc Admin Suspend Teacher controller
//@route PUT /api/v1/suspend/teacher/:Id
//@access Private
exports.suspendTeacher = async (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admins suspend Teacher",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};
//Desc Admin Unsuspend Teacher controller
//@route PUT /api/v1/unsuspend/teacher/:Id
//@access Private
exports.unsuspendTeacher = async (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admins Unsuspend Teacher",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

//Desc Admin Withdraw Teacher controller
//@route PUT /api/v1/withdraw/teacher/:Id
//@access Private
exports.withdrawTeacher = async (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admins Witdraw Teacher",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

//Desc Admin Unwithdraw Teacher controller
//@route PUT /api/v1/unwithdraw/teacher/:Id
//@access Private
exports.unwithdrawTeacher = async (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admins unwitdraw Teacher",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

//Desc Admin Public Exam controller
//@route PUT /api/v1/unpublish/exam/:Id
//@access Private
exports.publisheExam = async (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admins publish exam",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

//Desc Admin Public Exam controller
//@route PUT /api/v1/unpublish/exam/:Id
//@access Private
exports.unpublishExam = async (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admins unpublish exam",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};
