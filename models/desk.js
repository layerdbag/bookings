const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Desk extends Model { }

Desk.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'desk'
})

module.exports = Desk