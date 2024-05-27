import memberModel from "./member.model.js";
import tournamentModel from "./tournament.model.js";

export default (sequelize, DataType) => {
  sequelize.define(
    "Participant",
    {
      MemberId: {
        type: DataType.INTEGER,
        references: {
          model: memberModel,
          key: "id",
        },
      },
      TournamentId: {
        type: DataType.INTEGER,
        references: {
          model: tournamentModel,
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
