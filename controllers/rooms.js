const router = require('express').Router();

const { Room } = require('../models');
const { route } = require('./login');

router.get('/', async (req, res) => {
  const rooms = await Room.findAll();
  res.json(rooms);
});


router.post('/', async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.json(room);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


const roomFinder = async (req, res, next) => {
  req.room = await Room.findByPk(req.params.id);
  next();
}

router.get('/:id', roomFinder, async (req, res) => {
  if (req.room) {
    res.json(req.room);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', roomFinder, async (req, res) => {
  if (req.room) {
    await req.room.destroy();
  }
  res.status(204).end();
});

router.put('/:id', roomFinder, async (req, res) => {
  const room = req.room;
  if (room) {
    room.name = req.body.name;
    room.capacity = req.body.capacity;
    await room.save();
    res.json(room);
  } else {
    res.status(404).end();
  }
});


module.exports = router;