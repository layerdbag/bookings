const router = require('express').Router();

const { Desk } = require('../models');

router.get('/', async (req, res) => {
  const desks = await Desk.findAll();
  res.json(desks);
});

router.post('/', async (req, res) => {
  try {
    const desk = await Desk.create(req.body);
    console.log(JSON.stringify(desk, null, 2));
    res.status(201).json(desk);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

const deskFinder = async (req, res, next) => {
  req.desk = await Desk.findByPk(req.params.id);
  next();
}

router.get('/:id', deskFinder, async (req, res) => {
  if (req.desk) {
    res.json(req.desk);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', deskFinder, async (req, res) => {
  if (req.desk) {
    await req.desk.destroy();
  }
  res.status(204).end();
});

router.put('/:id', deskFinder, async (req, res) => {
  const desk = req.desk;
  if (desk) {
    desk.number = req.body.number;
    await desk.save();
    res.json(desk);
  } else {
    res.status(404).end();
  }
});


module.exports = router;