// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
let students = require('../data/students');

// 1. GET /students - Get all students
router.get('/', (req, res) => {
  res.status(200).json(students);
});

// 2. GET /students/:id - Get student by ID
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.status(200).json(student);
});

// 3. POST /students - Create a new student
router.post('/', (req, res) => {
  const { name, age, course } = req.body;

  // Validation
  if (!name || !age || !course) {
    return res.status(400).json({ message: 'Please provide name, age, and course' });
  }

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    age: Number(age),
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 4. PUT /students/:id - Update an existing student
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const { name, age, course } = req.body;

  if (name) students[studentIndex].name = name;
  if (age) students[studentIndex].age = Number(age);
  if (course) students[studentIndex].course = course;

  res.status(200).json(students[studentIndex]);
});

// 5. DELETE /students/:id - Delete a student
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const deletedStudent = students.splice(studentIndex, 1);
  res.status(200).json({
    message: 'Student deleted successfully',
    student: deletedStudent[0]
  });
});

module.exports = router;