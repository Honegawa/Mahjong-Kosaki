export interface Participant {
  PersonId: number;
  TournamentId: number;
  Tournament: ParticipantTournament;
  Person: ParticipantInfo;
}

export type ParticipantForm = {
  PersonId: number;
  TournamentId: number;
};

export type ParticipantTournament = {
  name: string;
  startDate: string;
  endDate: string;
};

export type ParticipantInfo = {
  firstname: string;
  lastname: string;
  email: string;
};
