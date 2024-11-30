import { RootState as RootStateTournament } from "../../interfaces/tournament";

export const allTournaments = (state: RootStateTournament) => state.tournaments.data;

export const oneTournament = (state: RootStateTournament) => state.tournaments.data;
