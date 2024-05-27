import memberModel from "./member.model.js";
import gameModel from "./game.model.js";

export default (sequelize, DataType) => {
  sequelize.define(
    "Player",
    {
      MemberId: {
        type: DataType.INTEGER,
        references: {
          model: memberModel,
          key: "id",
        },
      },
      GameId: {
        type: DataType.INTEGER,
        references: {
          model: gameModel,
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
