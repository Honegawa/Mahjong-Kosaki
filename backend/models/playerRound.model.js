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
          isIn: [[20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110]],
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
