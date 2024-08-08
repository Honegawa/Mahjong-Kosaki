import { LENGTHS, TYPES } from "../utils/constants/game.constants.js";

export default (sequelize, DataType) => {
  sequelize.define(
    "Game",
    {
      type: {
        type: DataType.ENUM(TYPES),
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
        type: DataType.ENUM(LENGTHS),
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
