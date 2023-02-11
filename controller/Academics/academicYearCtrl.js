const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academics/AcademicYear");
const Admin = require("../../model/Staff/Admin");

//@Dec CREATE Accademic year controller
//@Route POST /api/v1/academic-year
//@Access private
exports.createAcademicYrCtrl = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  const academicYearExit = await AcademicYear.findOne({ name });

  if (academicYearExit) {
    throw new Error("Acadmic Already Exit");
  }

  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.useAuth._id,
  });
  //pushing academic
  const admin = await Admin.findById(req.useAuth._id);
  admin.academicYears.push(academicYearCreated);
  await admin.save();

  res.status(201).json({
    status: "Success",
    message: "Academic Year created Successufully",
    data: academicYearCreated,
  });
});

//@Dec GET Single  Accademic year controller
//@Route GET /api/v1/academic-year/:id
//@Access private
exports.getAcademicYrCtrl = AsyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    message: "Get single Academic Year  Successufully",
    data: academicYear,
  });
});

//@Dec GET All Accademic year controller
//@Route GET /api/v1/academic-year
//@Access private
exports.getAcademicYrsCtrl = AsyncHandler(async (req, res) => {
  const acadmicYears = await AcademicYear.find();
  res.status(201).json({
    status: "Success",
    message: "Get All Academic Year  Successufully",
    data: acadmicYears,
  });
});

//@Dec UPDATE Accademic year controller
//@Route  PUT  /api/v1/academic-year/:id
//@Access private
exports.updateAcademicYrCtrl = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear, isCurrent } = req.body;

  //checking if the acadmic year exit
  const academicYearExit = await AcademicYear.findOne({ name });
  if (academicYearExit) {
    throw new Error("Acadmic Already Exit");
  }
  //update
  const academicYearUpdated = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
      createdBy: req.useAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "Success",
    message: "Academic Year updated  Successufully",
    data: academicYearUpdated,
  });
});

//@Dec DELETE Accademic year controller
//@Route DELETE /api/v1/academic-year/:id
//@Access private
exports.deleteAcademicYrCtrl = AsyncHandler(async (req, res) => {
  const academicYearDeleted = await AcademicYear.findByIdAndDelete(
    req.params.id
  );
  res.status(201).json({
    status: "Success",
    message: `${academicYearDeleted.name} has been Academic Year Delete Successufully`,
  });
});
