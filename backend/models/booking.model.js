export default (sequelize, DataType) => {
  sequelize.define(
    "Booking",
    {
      date: {
        type: DataType.DATE,
        allowNull: false,
      },
      table: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
            min: 1
        }
      },
      firstname: {
        type: DataType.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataType.STRING,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
      },
      type: {
        type: DataType.STRING,
        allowNull: false,
      },
      format: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
            isIn: [[3,4]]
        }
      },
      calendarLink: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
      },
    },
    {
      timestamps: true,
    }
  );
};
