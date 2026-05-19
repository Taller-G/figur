import { StickerRepository } from '@domain/repositories/sticker.repository';
import { Sticker } from '@domain/entities/sticker.entity';
import { StickerId } from '@domain/value-objects/sticker-id.value-object';
import { StickerNumber } from '@domain/value-objects/sticker-number.value-object';
import { PlayerName } from '@domain/value-objects/player-name.value-object';
import { CreateStickerDto } from '../dtos/create-sticker.dto';
import { StickerDto } from '../dtos/sticker.dto';

export class CreateStickerUseCase {
  constructor(private readonly stickerRepository: StickerRepository) {}

  async execute(dto: CreateStickerDto): Promise<StickerDto> {
    // Check if sticker number already exists
    const existingSticker = await this.stickerRepository.findByNumber(
      new StickerNumber(dto.number),
    );

    if (existingSticker) {
      throw new Error(`Sticker with number ${dto.number} already exists`);
    }

    const sticker = new Sticker(
      StickerId.generate(),
      new StickerNumber(dto.number),
      new PlayerName(dto.playerName),
      dto.team,
      dto.country,
      dto.position,
      dto.isSpecial || false,
      dto.imageUrl,
    );

    await this.stickerRepository.save(sticker);

    return this.mapToDto(sticker);
  }

  private mapToDto(sticker: Sticker): StickerDto {
    return {
      id: sticker.getId().getValue(),
      number: sticker.getNumber().getValue(),
      playerName: sticker.getPlayerName().getValue(),
      team: sticker.getTeam(),
      country: sticker.getCountry(),
      position: sticker.getPosition(),
      isSpecial: sticker.getIsSpecial(),
      imageUrl: sticker.getImageUrl(),
    };
  }
}