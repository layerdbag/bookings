const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Booking extends Model { }

Booking.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false

  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'booking'
})


module.exports = Booking