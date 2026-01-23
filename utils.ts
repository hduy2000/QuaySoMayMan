import { Participant, Prize, Winner } from './types';

export const getEligibleParticipants = (
  participants: Participant[], 
  winners: Winner[], 
  currentPrize: Prize
): Participant[] => {
  const winnerIds = new Set(winners.map(w => w.participantId));
  
  return participants.filter(p => {
    // 1. Must not have won already
    if (winnerIds.has(p.id)) return false;
    
    // 2. Must meet the years of service requirement (Weighted logic)
    if (p.yearsWorked < currentPrize.minYears) return false;
    
    return true;
  });
};

export const getRandomParticipant = (list: Participant[]): Participant | null => {
  if (list.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

export const exportToCSV = (data: any[], filename: string) => {
  // Add UTF-8 BOM to ensure proper encoding
  const BOM = "\uFEFF";
  const csvContent = BOM 
      + Object.keys(data[0]).join(",") + "\n"
      + data.map(row => Object.values(row).join(",")).join("\n");
  
  // Create blob with UTF-8 encoding
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
};
