const AsyncHandler = require("express-async-handler");
const ClassLevel = require("../../model/Academics/ClassLevel");
const Admin = require("../../model/Staff/Admin");

//@Desc Create Class level
//@Route POST api/v1/class-levels
//@Access Private
exports.createClassLevelCtrl = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const classLevelExit = await ClassLevel.findOne({ name });
  if (classLevelExit) {
    throw new Error("Class Level already created");
  }
  const createdClassLevel = await ClassLevel.create({
    name,
    description,
    createdBy: req.useAuth._id,
  });
  //pushing class level to Admin model
  const admin = await Admin.findById(req.useAuth._id);
  admin.classLevels.push(createdClassLevel);
  await admin.save();

  res.status(201).json({
    status: "Success",
    message: "Class Level Created Successfull",
    data: createdClassLevel,
  });
});

//@Desc Get Single Class level
//@Route GET api/v1/class-levels/:id
//@Access Private
exports.getClassLevelCtrl = AsyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    message: "Get single Class Level Successfull",
    data: classLevel,
  });
});

//@Desc Get All Class Class level
//@Route GET api/v1/class-levels/
//@Access Private
exports.getClassLevelsCtrl = AsyncHandler(async (req, res) => {
  const classLevels = await ClassLevel.find();
  res.status(200).json({
    status: "Success",
    message: "Get All Class Level Successfull",
    data: classLevels,
  });
});

//@Desc Update Single Class level
//@Route PUT api/v1/class-levels/:id
//@Access Private
exports.updateClassLevelCtrl = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const classLevelExit = await ClassLevel.findOne({ name });
  if (classLevelExit) {
    throw new Error("Class Leve Name Alredy exit");
  }

  const isFound = await ClassLevel.findById(req.params.id);
  if (!isFound) {
    throw new Error("Class level your update is not Found");
  }

  const updatedClassLvel = await ClassLevel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      createdBy: req.useAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "Success",
    message: "Updated Class Level Successfull",
    data: updatedClassLvel,
  });
});

//@Desc Delete Single Class level
//@Route DELETE api/v1/class-levels/:id
//@Access Private
exports.deleteClassLevelCtrl = AsyncHandler(async (req, res) => {
  const isFound = await ClassLevel.findById(req.params.id);
  if (!isFound) {
    throw new Error("Class level your update is not Found");
  }
  const deletedClassLevel = await ClassLevel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "Success",
    message: "Delete Class Level Successfull",
  });
});
