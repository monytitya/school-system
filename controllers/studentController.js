const Student = require('../models/student');


const createStudent = async (req, res) => {
  const { name, age, email } = req.body;
  const student = await Student.create({ name, age, email });
  res.status(201).json(student);
};

const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};


const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};


const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};

const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json({ message: 'Student deleted' });
};

module.exports = { createStudent, getStudents, getStudentById, updateStudent, deleteStudent };
