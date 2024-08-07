export default (sequelize, DataType) => {
  sequelize.define(
    "Game",
    {
      type: {
        type: DataType.ENUM(["Casual", "Classée", "Entrainement", "Tournoi"]),
        allowNull: false,
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
        type: DataType.ENUM(["Tonpuusen", "Hanchan", "1-Round", "Chinitsu Challenge"]),
        allowNull: false,
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
