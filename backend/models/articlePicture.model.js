export default (sequelize, DataType) => {
  sequelize.define(
    "ArticlePicture",
    {
      picture: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
