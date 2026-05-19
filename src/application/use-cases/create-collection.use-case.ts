import { CollectionRepository } from '@domain/repositories/collection.repository';
import { Collection } from '@domain/entities/collection.entity';
import { CollectionId } from '@domain/value-objects/collection-id.value-object';
import { UserId } from '@domain/value-objects/user-id.value-object';
import { CreateCollectionDto } from '../dtos/create-collection.dto';
import { CollectionDto } from '../dtos/collection.dto';

export class CreateCollectionUseCase {
  constructor(private readonly collectionRepository: CollectionRepository) {}

  async execute(dto: CreateCollectionDto): Promise<CollectionDto> {
    const collection = new Collection(
      CollectionId.generate(),
      new UserId(dto.userId),
      dto.name,
    );

    await this.collectionRepository.save(collection);

    return this.mapToDto(collection);
  }

  private mapToDto(collection: Collection): CollectionDto {
    return {
      id: collection.getId().getValue(),
      userId: collection.getUserId().getValue(),
      name: collection.getName(),
      collectedStickers: collection.getCollectedStickers().map((cs) => ({
        stickerId: cs.stickerId.getValue(),
        quantity: cs.quantity,
        collectedAt: cs.collectedAt,
      })),
      totalStickers: collection.getTotalStickers(),
      uniqueStickers: collection.getUniqueStickersCount(),
    };
  }
}