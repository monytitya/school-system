const Student = require('../models/student');

// Create student
const createStudent = async (req, res) => {
  const { name, age, email } = req.body;
  const student = await Student.create({ name, age, email });
  res.status(201).json(student);
};

// Get all students
const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// Get student by ID
const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};

// Update student
const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};

// Delete student
const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json({ message: 'Student deleted' });
};

module.exports = { createStudent, getStudents, getStudentById, updateStudent, deleteStudent };
