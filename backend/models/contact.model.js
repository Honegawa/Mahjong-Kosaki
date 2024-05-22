export default (sequelize, DataType) => {
  sequelize.define(
    "Contact",
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
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      object: {
        type: DataType.STRING,
        allowNull: false,
      },
      content: {
        type: DataType.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
