import { DRAWS, ROUND_WINDS } from "../utils/constants/game.constants.js";

export default (sequelize, DataType) => {
  sequelize.define(
    "Round",
    {
      wind: {
        type: DataType.ENUM(ROUND_WINDS),
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
        type: DataType.ENUM(DRAWS),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
