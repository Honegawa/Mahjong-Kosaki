export default (sequelize, DataType) => {
  sequelize.define(
    "Round",
    {
      wind: {
        type: DataType.ENUM(["Est", "Sud", "Ouest"]),
        allowNull: false,
      },
      roundNb: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
          min: 1,
          max: 4,
        },
      },
      honba: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      stick: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      draw: {
        type: DataType.ENUM([
          "Suufon renda",
          "Kyuushu kyuuhai",
          "Suucha riichi",
          "Suukaikan",
          "Sanchahou",
          "Ryuukyoku",
        ]),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
