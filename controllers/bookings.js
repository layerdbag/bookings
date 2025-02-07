const router = require('express').Router();
const { tokenExtractor } = require('../util/middleware');
const { Op } = require('sequelize');

const { Booking, Employee, Room, Desk } = require('../models');

router.get('/', async (req, res) => {
  const bookings = await Booking.findAll({
    attributes: { exclude: ['employeeId', 'roomId', 'deskId'] },
    include: [{
      model: Employee,
      attributes: ['name']
    },
    {
      model: Room,
      attributes: ['name']
    },
    {
      model: Desk,
      attributes: ['number']
    }
    ],
  });
  res.json(bookings);
});


router.post('/', tokenExtractor, async (req, res) => {
  console.log('req body: ', req.body);
  try {
    const employee = await Employee.findByPk(req.decodedToken.id);

    // let contain = {
    //   [Op.or]: [req.body.date],
    // }

    // Check if employee already has a booking for the same date (and/or time)
    const existingBooking = await Booking.findOne({
      where: {
        employeeId: employee.id,
        date: {
          [Op.eq]: req.body.date
        },
        // startTime: req.body.startTime,
        // endTime: req.body.endTime,
        // employeeId: employee.id
      }
    });
    console.log('existing booking: ', existingBooking);
    if (existingBooking) {
      return res.status(400).json({ error: 'Employee already has a booking for the same date' });
    }

    // Check that endTime is after startTime
    if (req.body.endTime <= req.body.startTime) {
      return res.status(400).json({ error: 'endTime must be after startTime' });
    }

    // Check that startTime is not before 09:00 and endTime is not after 17:00
    if (req.body.startTime < '09:00:00' || req.body.endTime > '17:00:00') {
      return res.status(400).json({ error: 'startTime and endTime must be between 09:00 and 17:00' });
    }

    // Check if the room is available for the date and time
    const room = await Room.findByPk(req.body.roomId);

    const booking = await Booking.create({ ...req.body, employeeId: employee.id });
    // console.log(JSON.stringify(booking, null, 2));
    res.status(201).json(booking);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


router.delete('/:id', tokenExtractor, async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (booking.employeeId === req.decodedToken.id) {
    await booking.destroy();
    res.status(204).end();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
});


module.exports = router;