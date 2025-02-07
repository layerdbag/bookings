const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Employee extends Model { }

Employee.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Must be a valid email format'
      }
    }
  },
  // password: DataTypes.STRING

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'employee'
})


module.exports = Employee