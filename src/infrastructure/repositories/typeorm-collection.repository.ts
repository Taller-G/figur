import { Repository } from 'typeorm';
import { CollectionRepository } from '@domain/repositories/collection.repository';
import { Collection, CollectedSticker } from '@domain/entities/collection.entity';
import { CollectionId } from '@domain/value-objects/collection-id.value-object';
import { UserId } from '@domain/value-objects/user-id.value-object';
import { StickerId } from '@domain/value-objects/sticker-id.value-object';
import { CollectionDbEntity } from '../database/entities/collection.entity';
import { CollectedStickerDbEntity } from '../database/entities/collected-sticker.entity';

export class TypeOrmCollectionRepository implements CollectionRepository {
  constructor(
    private readonly collectionRepository: Repository<CollectionDbEntity>,
    private readonly collectedStickerRepository: Repository<CollectedStickerDbEntity>,
  ) {}

  async save(collection: Collection): Promise<void> {
    const dbEntity = await this.mapToDbEntity(collection);
    await this.collectionRepository.save(dbEntity);
  }

  async findById(id: CollectionId): Promise<Collection | null> {
    const dbEntity = await this.collectionRepository.findOne({
      where: { id: id.getValue() },
      relations: ['collectedStickers'],
    });

    return dbEntity ? this.mapToDomain(dbEntity) : null;
  }

  async findByUserId(userId: UserId): Promise<Collection[]> {
    const dbEntities = await this.collectionRepository.find({
      where: { userId: userId.getValue() },
      relations: ['collectedStickers'],
      order: { createdAt: 'DESC' },
    });

    return dbEntities.map(this.mapToDomain);
  }

  async findAll(): Promise<Collection[]> {
    const dbEntities = await this.collectionRepository.find({
      relations: ['collectedStickers'],
      order: { createdAt: 'DESC' },
    });

    return dbEntities.map(this.mapToDomain);
  }

  async delete(id: CollectionId): Promise<void> {
    await this.collectionRepository.delete({ id: id.getValue() });
  }

  async exists(id: CollectionId): Promise<boolean> {
    const count = await this.collectionRepository.count({
      where: { id: id.getValue() },
    });
    return count > 0;
  }

  private async mapToDbEntity(collection: Collection): Promise<CollectionDbEntity> {
    const entity = new CollectionDbEntity();
    entity.id = collection.getId().getValue();
    entity.userId = collection.getUserId().getValue();
    entity.name = collection.getName();

    // Clear existing collected stickers to avoid duplicates
    await this.collectedStickerRepository.delete({
      collectionId: entity.id,
    });

    entity.collectedStickers = collection.getCollectedStickers().map((cs) => {
      const csEntity = new CollectedStickerDbEntity();
      csEntity.collectionId = entity.id;
      csEntity.stickerId = cs.stickerId.getValue();
      csEntity.quantity = cs.quantity;
      csEntity.collectedAt = cs.collectedAt;
      return csEntity;
    });

    return entity;
  }

  private mapToDomain(dbEntity: CollectionDbEntity): Collection {
    const collectedStickers: CollectedSticker[] = dbEntity.collectedStickers.map(
      (cs) => ({
        stickerId: new StickerId(cs.stickerId),
        quantity: cs.quantity,
        collectedAt: cs.collectedAt,
      }),
    );

    return new Collection(
      new CollectionId(dbEntity.id),
      new UserId(dbEntity.userId),
      dbEntity.name,
      collectedStickers,
    );
  }
}