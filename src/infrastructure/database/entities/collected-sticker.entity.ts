import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CollectionDbEntity } from './collection.entity';

@Entity('collected_stickers')
export class CollectedStickerDbEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  collectionId: string;

  @Column()
  stickerId: string;

  @Column()
  quantity: number;

  @Column({ type: 'datetime' })
  collectedAt: Date;

  @ManyToOne(() => CollectionDbEntity, (collection) => collection.collectedStickers)
  @JoinColumn({ name: 'collectionId' })
  collection: CollectionDbEntity;
}