import { Repository } from 'typeorm';
import { StickerRepository } from '@domain/repositories/sticker.repository';
import { Sticker } from '@domain/entities/sticker.entity';
import { StickerId } from '@domain/value-objects/sticker-id.value-object';
import { StickerNumber } from '@domain/value-objects/sticker-number.value-object';
import { PlayerName } from '@domain/value-objects/player-name.value-object';
import { StickerDbEntity } from '../database/entities/sticker.entity';

export class TypeOrmStickerRepository implements StickerRepository {
  constructor(private readonly repository: Repository<StickerDbEntity>) {}

  async save(sticker: Sticker): Promise<void> {
    const dbEntity = this.mapToDbEntity(sticker);
    await this.repository.save(dbEntity);
  }

  async findById(id: StickerId): Promise<Sticker | null> {
    const dbEntity = await this.repository.findOne({
      where: { id: id.getValue() },
    });

    return dbEntity ? this.mapToDomain(dbEntity) : null;
  }

  async findByNumber(number: StickerNumber): Promise<Sticker | null> {
    const dbEntity = await this.repository.findOne({
      where: { number: number.getValue() },
    });

    return dbEntity ? this.mapToDomain(dbEntity) : null;
  }

  async findAll(): Promise<Sticker[]> {
    const dbEntities = await this.repository.find({
      order: { number: 'ASC' },
    });

    return dbEntities.map(this.mapToDomain);
  }

  async findByCountry(country: string): Promise<Sticker[]> {
    const dbEntities = await this.repository.find({
      where: { country },
      order: { number: 'ASC' },
    });

    return dbEntities.map(this.mapToDomain);
  }

  async findByTeam(team: string): Promise<Sticker[]> {
    const dbEntities = await this.repository.find({
      where: { team },
      order: { number: 'ASC' },
    });

    return dbEntities.map(this.mapToDomain);
  }

  async findSpecialStickers(): Promise<Sticker[]> {
    const dbEntities = await this.repository.find({
      where: { isSpecial: true },
      order: { number: 'ASC' },
    });

    return dbEntities.map(this.mapToDomain);
  }

  async delete(id: StickerId): Promise<void> {
    await this.repository.delete({ id: id.getValue() });
  }

  async exists(id: StickerId): Promise<boolean> {
    const count = await this.repository.count({
      where: { id: id.getValue() },
    });
    return count > 0;
  }

  private mapToDbEntity(sticker: Sticker): StickerDbEntity {
    const entity = new StickerDbEntity();
    entity.id = sticker.getId().getValue();
    entity.number = sticker.getNumber().getValue();
    entity.playerName = sticker.getPlayerName().getValue();
    entity.team = sticker.getTeam();
    entity.country = sticker.getCountry();
    entity.position = sticker.getPosition();
    entity.isSpecial = sticker.getIsSpecial();
    entity.imageUrl = sticker.getImageUrl();
    return entity;
  }

  private mapToDomain(dbEntity: StickerDbEntity): Sticker {
    return new Sticker(
      new StickerId(dbEntity.id),
      new StickerNumber(dbEntity.number),
      new PlayerName(dbEntity.playerName),
      dbEntity.team,
      dbEntity.country,
      dbEntity.position,
      dbEntity.isSpecial,
      dbEntity.imageUrl,
    );
  }
}