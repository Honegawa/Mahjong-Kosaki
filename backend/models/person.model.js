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
        allowNull: true,
        validate: {
          is: /^0\d{9}$/,
        },
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      subscription: {
        type: DataType.DATE,
        allowNull: true,
      },
      EMANumber: {
        type: DataType.STRING,
        allowNull: true,
        validate: {
          is: /^\d{8}$/
        }
      },
      role: {
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      timestamps: true,
    }
  );
};
