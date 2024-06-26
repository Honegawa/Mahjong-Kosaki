export default (sequelize, DataType) => {
  sequelize.define(
    "Member",
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
      password: {
        type: DataType.STRING,
        allowNull: true,
      },
      phone: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          is: /^0\d{9}$/,
        },
      },
      subscription: {
        type: DataType.DATE,
        allowNull: false,
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
