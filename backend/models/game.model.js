export default (sequelize, DataType) => {
  sequelize.define(
    "Game",
    {
      type: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isIn: [["casual", "ranked", "tournament", "training"]],
        },
      },
      format: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
          min: 2,
          max: 4,
        },
      },
      date: {
        type: DataType.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
