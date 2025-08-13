const express = require('express');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Create a new appointment
router.post('/', async (req, res) => {
  const { patientId, doctorId, appointmentDate, symptoms, diagnosis, prescription, notes } = req.body;

  try {
    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate,
      symptoms,
      diagnosis,
      prescription,
      notes
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all appointments for a specific patient
router.get('/patient/:patientId', async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patientId })
      .populate('doctorId', 'firstName lastName email')  // Populate doctor basic info
      .sort({ appointmentDate: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
