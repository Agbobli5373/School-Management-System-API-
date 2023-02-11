const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academics/AcademicYear");
const Admin = require("../../model/Staff/Admin");

//@Dec POST Accademic year controller
//@Route /api/v1/academic-year
//@Access private
exports.createAcademicYrCtrl = AsyncHandler(async (req, res) => {
  res.status(201).json({
    status: "Success",
    message: "Academic Year created Successufully",
  });
});

//@Dec GET Single  Accademic year controller
//@Route /api/v1/academic-year/:id
//@Access private
exports.getAcademicYrCtrl = AsyncHandler(async (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Get single Academic Year  Successufully",
  });
});

//@Dec GET All Accademic year controller
//@Route /api/v1/academic-year
//@Access private
exports.getAcademicYrsCtrl = AsyncHandler(async (req, res) => {
  res.status(201).json({
    status: "Success",
    message: "Get All Academic Year  Successufully",
  });
});

//@Dec UPDATE Accademic year controller
//@Route /api/v1/academic-year/:id
//@Access private
exports.updateAcademicYrCtrl = AsyncHandler(async (req, res) => {
  res.status(201).json({
    status: "Success",
    message: "Academic Year updated  Successufully",
  });
});

//@Dec DELETE Accademic year controller
//@Route /api/v1/academic-year/:id
//@Access private
exports.deleteAcademicYrCtrl = AsyncHandler(async (req, res) => {
  res.status(201).json({
    status: "Success",
    message: "Academic Year Delete Successufully",
  });
});
