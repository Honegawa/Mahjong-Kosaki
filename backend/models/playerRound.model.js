import { FU, SEAT_WINDS } from "../utils/constants/game.constants.js";
import personModel from "./person.model.js";
import roundModel from "./round.model.js";

export default (sequelize, DataType) => {
  sequelize.define(
    "PlayerRound",
    {
      PersonId: {
        type: DataType.INTEGER,
        references: {
          model: personModel,
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
        type: DataType.ENUM(SEAT_WINDS),
        allowNull: false,
      },
      roundScore: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      tenpai: {
        type: DataType.BOOLEAN,
        allowNull: true,
      },
      han: {
        type: DataType.TINYINT,
        allowNull: true,
        validate: {
          min: 1,
        },
      },
      fu: {
        type: DataType.TINYINT,
        allowNull: true,
        validate: {
          isIn: [FU],
        },
      },
      yaku: {
        type: DataType.STRING,
        allowNull: true,
      },
      handValue: {
        type: DataType.STRING,
        allowNull: true,
        validate: {
          is: /^\d+(\/\d+){0,1}$/,
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
