export default (sequelize, DataType) => {
  const Contact = sequelize.define(
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
      },
      phone: {
        type: DataType.STRING,
        allowNull: false,
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
