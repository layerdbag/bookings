const Employee = require('./employee')
const Desk = require('./desk')
const Room = require('./room')
const Booking = require('./booking')
// const EmployeeDesk = require('./employeedesk')

// Define Associations

// Room to Desk (One-to-Many)
Room.hasMany(Desk)
Desk.belongsTo(Room)

// Employee to Bookings (One-to-Many)
Employee.hasOne(Booking)
Booking.belongsTo(Employee)

// Room to Bookings (One-to-Many)
Room.hasMany(Booking)
Booking.belongsTo(Room)

// Desk to Bookings (One-to-Many)
Desk.hasMany(Booking)
Booking.belongsTo(Desk)

// Employee to Desk (Many-to-Many)
// Employee.belongsToMany(Desk, { through: EmployeeDesk })
// Desk.belongsToMany(Employee, { through: EmployeeDesk })



// Sync the models
// Employee.sync({ alter: true })
// Desk.sync({ alter: true })
// Room.sync({ alter: true })
// Booking.sync({ alter: true })
// EmployeeDesk.sync({ alter: true })

module.exports = {
  Employee,
  Desk,
  Room,
  Booking,
  // EmployeeDesk
}