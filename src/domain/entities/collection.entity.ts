import { CollectionId } from '../value-objects/collection-id.value-object';
import { UserId } from '../value-objects/user-id.value-object';
import { StickerId } from '../value-objects/sticker-id.value-object';

export interface CollectedSticker {
  stickerId: StickerId;
  quantity: number;
  collectedAt: Date;
}

export class Collection {
  private collectedStickers: Map<string, CollectedSticker>;

  constructor(
    private readonly id: CollectionId,
    private readonly userId: UserId,
    private readonly name: string,
    collectedStickers: CollectedSticker[] = [],
  ) {
    this.validateCollection();
    this.collectedStickers = new Map();
    collectedStickers.forEach((cs) => {
      this.collectedStickers.set(cs.stickerId.getValue(), cs);
    });
  }

  private validateCollection(): void {
    if (!this.name?.trim()) {
      throw new Error('Collection name cannot be empty');
    }
  }

  getId(): CollectionId {
    return this.id;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getName(): string {
    return this.name;
  }

  addSticker(stickerId: StickerId, quantity: number = 1): void {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    const stickerIdValue = stickerId.getValue();
    const existing = this.collectedStickers.get(stickerIdValue);

    if (existing) {
      this.collectedStickers.set(stickerIdValue, {
        ...existing,
        quantity: existing.quantity + quantity,
      });
    } else {
      this.collectedStickers.set(stickerIdValue, {
        stickerId,
        quantity,
        collectedAt: new Date(),
      });
    }
  }

  removeSticker(stickerId: StickerId, quantity: number = 1): void {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    const stickerIdValue = stickerId.getValue();
    const existing = this.collectedStickers.get(stickerIdValue);

    if (!existing) {
      throw new Error('Sticker not found in collection');
    }

    if (existing.quantity <= quantity) {
      this.collectedStickers.delete(stickerIdValue);
    } else {
      this.collectedStickers.set(stickerIdValue, {
        ...existing,
        quantity: existing.quantity - quantity,
      });
    }
  }

  hasSticker(stickerId: StickerId): boolean {
    return this.collectedStickers.has(stickerId.getValue());
  }

  getStickerQuantity(stickerId: StickerId): number {
    const sticker = this.collectedStickers.get(stickerId.getValue());
    return sticker ? sticker.quantity : 0;
  }

  getCollectedStickers(): CollectedSticker[] {
    return Array.from(this.collectedStickers.values());
  }

  getTotalStickers(): number {
    return Array.from(this.collectedStickers.values()).reduce(
      (total, cs) => total + cs.quantity,
      0,
    );
  }

  getUniqueStickersCount(): number {
    return this.collectedStickers.size;
  }
}