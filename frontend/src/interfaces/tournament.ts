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
  // people: TournamentParticipant[]
}

export type RootState = {
  tournaments: {
    data: Tournament[];
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

// export type TournamentParticipant
