import memberModel from "./member.model.js";
import roundModel from "./round.model.js";

export default (sequelize, DataType) => {
  sequelize.define(
    "PlayerRound",
    {
      MemberId: {
        type: DataType.INTEGER,
        references: {
          model: memberModel,
          key: "id",
        },
      },
      RoundId: {
        type: DataType.INTEGER,
        references: {
          model: roundModel,
          key: "id",
        },
      },
      seatWind: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isIn: [["east", "south", "west", "north"]],
        },
      },
      roundScore: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      tenpai: {
        type: DataType.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
