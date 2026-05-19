import { Sticker } from '../entities/sticker.entity';
import { StickerId } from '../value-objects/sticker-id.value-object';
import { StickerNumber } from '../value-objects/sticker-number.value-object';

export interface StickerRepository {
  save(sticker: Sticker): Promise<void>;
  findById(id: StickerId): Promise<Sticker | null>;
  findByNumber(number: StickerNumber): Promise<Sticker | null>;
  findAll(): Promise<Sticker[]>;
  findByCountry(country: string): Promise<Sticker[]>;
  findByTeam(team: string): Promise<Sticker[]>;
  findSpecialStickers(): Promise<Sticker[]>;
  delete(id: StickerId): Promise<void>;
  exists(id: StickerId): Promise<boolean>;
}