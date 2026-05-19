import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CollectedStickerDbEntity } from './collected-sticker.entity';

@Entity('collections')
export class CollectionDbEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @OneToMany(() => CollectedStickerDbEntity, (cs) => cs.collection, {
    cascade: true,
    eager: true,
  })
  collectedStickers: CollectedStickerDbEntity[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}