const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('employees', {
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
        allowNull: false
      }
    });

    await queryInterface.createTable('rooms', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });

    await queryInterface.createTable('desks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // room_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'rooms',
      //     key: 'id'
      //   }
      // }
    });

    await queryInterface.addColumn('desks', 'room_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'id'
      }
    });

    // await queryInterface().createTable('employee_desks', {
    //   id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    //   },
    //   employee_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: 'employees',
    //       key: 'id'
    //     }
    //   },
    //   desk_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: 'desks',
    //       key: 'id'
    //     }
    //   }
    // });

    await queryInterface.createTable('bookings', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      desk_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'desks',
          key: 'id'
        }
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'rooms',
          key: 'id'
        }
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false
      }
    });

    // await queryInterface().addColumn('bookings',
    //   'employee_id', {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'employees',
    //     key: 'id'
    //   }
    // }, 'desk_id', {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'desks',
    //     key: 'id'
    //   }
    // }, 'room_id', {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'rooms',
    //     key: 'id'
    //   }
    // });

    // await queryInterface().addColumn('bookings', 'desk_id', {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'desks',
    //     key: 'id'
    //   }
    // });

    // await queryInterface().addColumn('bookings', 'room_id', {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'rooms',
    //     key: 'id'
    //   }
    // });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('bookings');
    // await queryInterface().dropTable('employee_desks');
    await queryInterface.dropTable('desks');
    await queryInterface.dropTable('rooms');
    await queryInterface.dropTable('employees');
  }
}