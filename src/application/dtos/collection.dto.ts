export interface CollectedStickerDto {
  stickerId: string;
  quantity: number;
  collectedAt: Date;
}

export interface CollectionDto {
  id: string;
  userId: string;
  name: string;
  collectedStickers: CollectedStickerDto[];
  totalStickers: number;
  uniqueStickers: number;
}