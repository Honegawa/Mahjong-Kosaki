export default (sequelize, DataType) => {
  sequelize.define(
    "Member",
    {
      password: {
        type: DataType.STRING,
        allowNull: false,
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
