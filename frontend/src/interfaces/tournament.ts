export interface Tournament {
  id: number | null;
  name: string;
  description: string;
  setup: string;
  startDate: string;
  endDate: string;
  registerLimitDate: string;
  entryFee: string;
  playerLimit: number;
  location: string;
  people: TournamentParticipant[];
}

export type TournamentParticipant = {
  id: number | null;
  firstname: string;
  lastname: string;
  email: string;
  EMANumber: string | null;
};

export type RootState = {
  tournaments: {
    data: Tournament[];
    id: number;
    tabIndex: number;
  };
};

export type UpdatedTournament = {
  data: Tournament[];
  update: Tournament;
};

export type DeletedTournament = {
  data: Tournament[];
  id: number;
};
