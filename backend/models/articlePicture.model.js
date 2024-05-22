export default (sequelize, DataType) => {
  sequelize.define(
    "ArticlePicture",
    {
      picture: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
