const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { SECRET } = require('../util/config');
const { Employee } = require('../models');

router.post('/', async (req, res) => {
  const body = req.body;

  const employee = await Employee.findOne({ where: { email: body.email } });

  console.log('Value of Employee: ', employee);

  // Using a hardcoded password for simplicity
  const passwordCorrect = body.password === 'secret';

  if (!(employee && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ email: employee.email, id: employee.id }, SECRET);

  res
    .status(200)
    .send({ token, email: employee.email, name: employee.name });
});


module.exports = router;