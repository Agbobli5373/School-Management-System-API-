const Admin = require("../../model/Staff/Admin");
const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, verifyPassword } = require("../../utils/helper");

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
    password: await hashPassword(password),
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
  //verifying password
  const isMatch = await verifyPassword(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    return res.json({ message: "Invalid Credential" });
  } else {
    return res.json({
      data: generateToken(user._id),
      message: "Admin Logged successfully",
    });
  }
});

//Desc Get Admins  controller
//@route GET /api/v1/admin/
//@access Private
exports.getAdmins = AsyncHandler(async (req, res) => {
  const admins = await Admin.find().select("-password -createdAt -updatedAt");
  res.status(200).json({
    status: "success",
    message: "Admins fetched successfully",
    data: admins,
  });
});
//Desc Get Get Admin Profile  controller
//@route GET /api/v1/admin/profile
//@access Private
exports.getAdminProfile = AsyncHandler(async (req, res) => {
  //console.log(req.useAuth);
  const user = await Admin.findById(req.useAuth._id)
    .select("-password -createdAt -updatedAt")
    .populate("academicYears")
    .populate("academicTerms")
    .populate("classLevels");
  if (!user) {
    res.status(404).json({
      message: "Admin Not found",
    });
  } else {
    res.status(200).json({
      status: "Success",
      message: "Admin fetched successfully",
      data: user,
    });
  }
});

//Desc Update Admin  controller
//@route PUT /api/v1/admin/:adminID
//@access Private
exports.updateAdmin = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  //checking if admin user exit
  //const adminFound = await Admin.findById(useAuth._id);
  //checking if email used
  const emailExit = await Admin.findOne({ email });
  console.log(emailExit);
  if (emailExit) {
    throw new Error("Email already taken");
  } else {
    if (password) {
      const admin = await Admin.findByIdAndUpdate(
        req.useAuth._id,
        {
          email,
          name,
          password: await hashPassword(password),
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        message: "Admin Updated Successfull",
        data: admin,
      });
    } else {
      const admin = await Admin.findByIdAndUpdate(
        req.useAuth._id,
        {
          email,
          name,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        message: "Admin Updated Successfull",
        data: admin,
      });
    }
  }
});
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
