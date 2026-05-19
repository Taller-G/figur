import { StickerRepository } from '@domain/repositories/sticker.repository';
import { Sticker } from '@domain/entities/sticker.entity';
import { StickerId } from '@domain/value-objects/sticker-id.value-object';
import { StickerDto } from '../dtos/sticker.dto';

export class GetStickerByIdUseCase {
  constructor(private readonly stickerRepository: StickerRepository) {}

  async execute(id: string): Promise<StickerDto | null> {
    const sticker = await this.stickerRepository.findById(new StickerId(id));

    if (!sticker) {
      return null;
    }

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