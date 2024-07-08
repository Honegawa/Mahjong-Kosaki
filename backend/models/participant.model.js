import personModel from "./person.model.js";
import tournamentModel from "./tournament.model.js";

export default (sequelize, DataType) => {
  sequelize.define(
    "Participant",
    {
      PersonId: {
        type: DataType.INTEGER,
        references: {
          model: personModel,
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
