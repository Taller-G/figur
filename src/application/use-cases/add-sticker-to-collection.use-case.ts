import { CollectionRepository } from '@domain/repositories/collection.repository';
import { StickerRepository } from '@domain/repositories/sticker.repository';
import { CollectionId } from '@domain/value-objects/collection-id.value-object';
import { StickerId } from '@domain/value-objects/sticker-id.value-object';
import { AddStickerToCollectionDto } from '../dtos/add-sticker-to-collection.dto';
import { CollectionDto } from '../dtos/collection.dto';

export class AddStickerToCollectionUseCase {
  constructor(
    private readonly collectionRepository: CollectionRepository,
    private readonly stickerRepository: StickerRepository,
  ) {}

  async execute(dto: AddStickerToCollectionDto): Promise<CollectionDto> {
    // Verify sticker exists
    const stickerExists = await this.stickerRepository.exists(
      new StickerId(dto.stickerId),
    );

    if (!stickerExists) {
      throw new Error(`Sticker with ID ${dto.stickerId} does not exist`);
    }

    // Get collection
    const collection = await this.collectionRepository.findById(
      new CollectionId(dto.collectionId),
    );

    if (!collection) {
      throw new Error(`Collection with ID ${dto.collectionId} not found`);
    }

    // Add sticker to collection
    collection.addSticker(
      new StickerId(dto.stickerId),
      dto.quantity || 1,
    );

    // Save updated collection
    await this.collectionRepository.save(collection);

    return this.mapToDto(collection);
  }

  private mapToDto(collection: any): CollectionDto {
    return {
      id: collection.getId().getValue(),
      userId: collection.getUserId().getValue(),
      name: collection.getName(),
      collectedStickers: collection.getCollectedStickers().map((cs: any) => ({
        stickerId: cs.stickerId.getValue(),
        quantity: cs.quantity,
        collectedAt: cs.collectedAt,
      })),
      totalStickers: collection.getTotalStickers(),
      uniqueStickers: collection.getUniqueStickersCount(),
    };
  }
}