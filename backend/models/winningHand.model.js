import memberModel from "./member.model.js";
import roundModel from "./round.model.js";

export default (sequelize, DataType) => {
  sequelize.define(
    "WinningHand",
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
      han: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      fu: {
        type: DataType.TINYINT,
        allowNull: false,
        validate: {
          isIn: [[20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110]],
        },
      },
      yaku: {
        type: DataType.STRING,
        allowNull: false,
      },
      value: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          is: /^\d+(\/\d+){0,1}$/
        }
      },
    },
    {
      timestamps: false,
    }
  );
};
