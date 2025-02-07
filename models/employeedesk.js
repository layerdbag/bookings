const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class EmployeeDesk extends Model { }

EmployeeDesk.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'employees',
      key: 'id'
    }
  },
  deskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'desks',
      key: 'id'
    }
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'employeedesk'
})

module.exports = EmployeeDesk