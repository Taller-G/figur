import { StickerRepository } from '@domain/repositories/sticker.repository';
import { Sticker } from '@domain/entities/sticker.entity';
import { StickerDto } from '../dtos/sticker.dto';

export class GetAllStickersUseCase {
  constructor(private readonly stickerRepository: StickerRepository) {}

  async execute(): Promise<StickerDto[]> {
    const stickers = await this.stickerRepository.findAll();
    return stickers.map(this.mapToDto);
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