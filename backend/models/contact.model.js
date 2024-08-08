export default (sequelize, DataType) => {
  sequelize.define(
    "Contact",
    {
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
