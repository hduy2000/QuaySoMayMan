export interface Participant {
  id: string;
  code: string;
  name: string;
  department: string;
  yearsWorked: number;
  onDuty?: boolean;
}

export interface Prize {
  id: string;
  name: string;
  product?: string;
  products?: string[]; // Array of products for multi-product prizes
  value?: string;
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
  prizeName: string;
  prizeProduct?: string;
  timestamp: number;
}

export type AppState = {
  participants: Participant[];
  prizes: Prize[];
  winners: Winner[];
  currentPrizeId: string;
};