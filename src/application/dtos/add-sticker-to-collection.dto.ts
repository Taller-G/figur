export interface AddStickerToCollectionDto {
  collectionId: string;
  stickerId: string;
  quantity?: number;
}