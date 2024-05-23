export default (sequelize, DataType) => {
  sequelize.define(
    "Round",
    {
      wind: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isIn: [["east", "south", "west", "north"]],
        },
      },
      roundNb: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
          min: 1,
          max: 4,
        },
      },
      homba: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      draw: {
        type: DataType.STRING,
        allowNull: true,
        validate: {
          isIn: [
            [
              "Suufon renda",
              "Kyuushu kyuuhai",
              "Suucha riichi",
              "Suukaikan",
              "Sanchahou",
              "Ryuukyoku",
            ],
          ],
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
