const Program = require("../../model/Academics/Program");
const Admin = require("../../model/Staff/Admin");
const AsyncHandler = require("express-async-handler");

//@Desc Create Program
//@Route POST api/v1/programs
//@Access Private
exports.createProgramCtrl = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const programExit = await Program.findOne({ name });
  if (programExit) {
    throw new Error("Program Already Exit");
  }
  const createdProgram = await Program.create({
    name,
    description,
    createdBy: req.useAuth._id,
  });

  //pushing programs to admin model
  const admin = await Admin.findById(req.useAuth._id);
  admin.programs.push(createdProgram);
  await admin.save();

  res.status(201).json({
    status: "Success",
    message: "Program created Successfull",
    data: createdProgram,
  });
});

//@Desc Get Single Program
//@Route GET api/v1/programs/:id
//@Access Private
exports.getProgramCtrl = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    message: " Get Single Program Successfull",
    data: program,
  });
});

//@Desc Get All Program
//@Route GET api/v1/programs
//@Access Private
exports.getProgramsCtrl = AsyncHandler(async (req, res) => {
  const programs = await Program.find();
  res.status(200).json({
    status: "Success",
    message: "Get all Program Successfull",
    data: programs,
  });
});

//@Desc Update Program
//@Route PUT api/v1/programs
//@Access Private
exports.updateProgramCtrl = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const programExit = await Program.findOne({ name });
  if (programExit) {
    throw new Error("Program Already Exit");
  }
  const isFound = await Program.findById(req.params.id);

  if (!isFound) {
    throw new Error("Program your updating do not exit");
  }

  const updatedProgram = await Program.findByIdAndUpdate(
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

  //pushing programs to admin model
  /* const admin = await Admin.findById(req.useAuth._id);
    admin.programs.push(createdProgram);
    await admin.save(); */

  res.status(201).json({
    status: "Success",
    message: "Program created Successfull",
    data: updatedProgram,
  });
});

//@Desc Create Program
//@Route POST api/v1/programs
//@Access Private
exports.deleteProgramCtrl = AsyncHandler(async (req, res) => {
  const isFound = await Program.findById(req.params.id);
  if (!isFound) {
    throw new Error("Program your deleting do not exit");
  }
  const deletedProgram = await Program.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "Success",
    message: "Program created Successfull",
  });
});
