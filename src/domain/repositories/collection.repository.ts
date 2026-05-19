import { Collection } from '../entities/collection.entity';
import { CollectionId } from '../value-objects/collection-id.value-object';
import { UserId } from '../value-objects/user-id.value-object';

export interface CollectionRepository {
  save(collection: Collection): Promise<void>;
  findById(id: CollectionId): Promise<Collection | null>;
  findByUserId(userId: UserId): Promise<Collection[]>;
  findAll(): Promise<Collection[]>;
  delete(id: CollectionId): Promise<void>;
  exists(id: CollectionId): Promise<boolean>;
}