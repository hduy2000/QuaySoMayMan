export interface Participant {
  id: string;
  code: string;
  name: string;
  department: string;
  yearsWorked: number;
}

export interface Prize {
  id: string;
  name: string;
  quantity: number;
  minYears: number; // The logic constraint
  imageUrl?: string;
  color: string;
}

export interface Winner {
  id: string;
  participantId: string;
  participant: Participant;
  prizeId: string;
  timestamp: number;
}

export type AppState = {
  participants: Participant[];
  prizes: Prize[];
  winners: Winner[];
  currentPrizeId: string;
};