const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create Student API
router.post('/students', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const student = new Student({ name:name, email:email });
    await student.save();
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error: error.message });
  }
});

// Assign or Change Mentor for a particular Student API
router.put('/students/:studentId/mentor', async (req, res, next) => {
    try {
      const { studentId } = req.params;
      const { mentorId } = req.body;
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      const mentor = await Mentor.findById(mentorId);
      if (!mentor) {
        return res.status(404).json({ message: 'Mentor not found' });
      }
      student.mentor = mentorId;
      await student.save();
      res.status(200).json({ message: 'Mentor assigned to student successfully', student });
    } catch (error) {
      res.status(500).json({ message: 'Error assigning mentor to student', error: error.message });
    }
  });


  
  
  module.exports = router; 
