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
      length: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isIn: [["Tonpuusen", "Hanchan", "1-Round", "Chinitsu Challenge"]]
        }
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
