export default (sequelize, DataType) => {
  sequelize.define(
    "Article",
    {
      title: {
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
