export default (sequelize, DataType) => {
  sequelize.define(
    "Person",
    {
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
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          is: /^0\d{9}$/,
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
