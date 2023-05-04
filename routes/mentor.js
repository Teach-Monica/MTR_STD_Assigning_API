const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');

// Create Mentor API
router.post('/mentors', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const mentor = new Mentor({ name:name, email:email });
    await mentor.save();
    res.status(200).json({ message: 'Mentor created successfully', mentor });
  } catch (error) {
    res.status(400).json({ message: 'Error creating mentor', error: error.message });
  }
});

// Assign Student to Mentor API
router.put('/mentors/:mentorId/students/:studentId', async (req, res, next) => {
  try {
    const { mentorId, studentId } = req.params;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    if (mentor.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student already assigned to this mentor' });
    }
    mentor.students.push(studentId);
    await mentor.save();
    res.status(200).json({ message: 'Student assigned to mentor successfully', mentor });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning student to mentor', error: error.message });
  }
});

// Show all students for a particular mentor API
router.get('/mentors/:mentorId/students', async (req, res, next) => {
  try {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId).populate('students');
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.status(200).json({ message: 'Students for mentor fetched successfully', students: mentor.students });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching students for mentor', error: error.message });
  }
});

module.exports = router;
