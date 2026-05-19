export interface CreateStickerDto {
  number: number;
  playerName: string;
  team: string;
  country: string;
  position: string;
  isSpecial?: boolean;
  imageUrl?: string;
}