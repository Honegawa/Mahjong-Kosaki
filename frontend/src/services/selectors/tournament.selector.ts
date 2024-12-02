import { createSelector } from "@reduxjs/toolkit";
import { RootState as RootStateTournament } from "../../interfaces/tournament";

export const allTournaments = (state: RootStateTournament) =>
  state.tournaments.data;

export const oneTournament = (state: RootStateTournament) =>
  state.tournaments.data;

export const filteredTournaments = createSelector(
  (state: RootStateTournament) => state.tournaments.data,
  (state: RootStateTournament) => state.tournaments.tabIndex,
  (data, tabIndex) => {
    const today = new Date().toISOString();
    switch (tabIndex) {
      case 1:
        return data.filter(
          (tournament) => tournament.registerLimitDate > today
        );
      case 2:
        return data.filter(
          (tournament) =>
            tournament.startDate < today && tournament.endDate > today
        );
      case 3:
        return data.filter((tournament) => tournament.endDate < today);

      default:
        return data;
    }
  }
);
