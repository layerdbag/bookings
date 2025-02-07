const router = require('express').Router();

const { Employee, Booking } = require('../models');

router.get('/', async (req, res) => {
  const employees = await Employee.findAll({
    include: {
      model: Booking,
      attributes: { exclude: ['employeeId', 'roomId', 'deskId'] },
    }
  });
  console.log(JSON.stringify(employees, null, 2));
  res.json(employees);
});


router.post('/', async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

const employeeFinder = async (req, res, next) => {
  req.employee = await Employee.findByPk(req.params.id);
  next();
}

router.get('/:id', employeeFinder, async (req, res) => {
  if (req.employee) {
    res.json(req.employee);
  } else {
    res.status(404).end();
  }
});


router.delete('/:id', employeeFinder, async (req, res) => {
  if (req.employee) {
    await req.employee.destroy();
  }
  res.status(204).end();
});

router.put('/:id', employeeFinder, async (req, res) => {
  const employee = req.employee;
  if (employee) {
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.username = req.body.username;
    await employee.save();
    res.json(employee);
  } else {
    res.status(404).end();
  }
});




module.exports = router;