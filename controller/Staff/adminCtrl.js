const mongoose = require('mongoose')


//Desc Register controller
//@route POST /api/v1/admin/register
//@access Private
exports.registerAdminCtrl = async (req,res) => {
    try {
        res.status(200).json({
          status: "Success",
          data: "Admin has been registered",
        });
      } catch (error) {
        res.status(500).json({
          status: "Failed",
          error: Error.message,
        });
      }
} 

//Desc Login controller
//@route POST /api/v1/admin/login
//@access Private
exports.loginAdminCtrl = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "Admin has been Login ",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
} 

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
}
//Desc Get Single Admin  controller
//@route GET /api/v1/admin/:adminID
//@access Private
exports.getSingleAdmin = async (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Single Admins",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
}

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
}
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
}

//Desc Admin Suspend Teacher controller
//@route PUT /api/v1/suspend/teacher/:Id
//@access Private
exports.suspendTeacher = async  (req, res) => {
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
}
//Desc Admin Unsuspend Teacher controller
//@route PUT /api/v1/unsuspend/teacher/:Id
//@access Private
exports.unsuspendTeacher = async  (req, res) => {
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
}

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
}

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
}

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
}

//Desc Admin Public Exam controller
//@route PUT /api/v1/unpublish/exam/:Id
//@access Private
exports.unpublishExam = async  (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admins uunpublish exam",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
}