import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('stickers')
export class StickerDbEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  number: number;

  @Column()
  playerName: string;

  @Column()
  team: string;

  @Column()
  country: string;

  @Column()
  position: string;

  @Column({ default: false })
  isSpecial: boolean;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}