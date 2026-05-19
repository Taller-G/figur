import { StickerId } from '../value-objects/sticker-id.value-object';
import { StickerNumber } from '../value-objects/sticker-number.value-object';
import { PlayerName } from '../value-objects/player-name.value-object';

export class Sticker {
  constructor(
    private readonly id: StickerId,
    private readonly number: StickerNumber,
    private readonly playerName: PlayerName,
    private readonly team: string,
    private readonly country: string,
    private readonly position: string,
    private readonly isSpecial: boolean = false,
    private readonly imageUrl?: string,
  ) {
    this.validateSticker();
  }

  private validateSticker(): void {
    if (!this.team?.trim()) {
      throw new Error('Team cannot be empty');
    }
    if (!this.country?.trim()) {
      throw new Error('Country cannot be empty');
    }
    if (!this.position?.trim()) {
      throw new Error('Position cannot be empty');
    }
  }

  getId(): StickerId {
    return this.id;
  }

  getNumber(): StickerNumber {
    return this.number;
  }

  getPlayerName(): PlayerName {
    return this.playerName;
  }

  getTeam(): string {
    return this.team;
  }

  getCountry(): string {
    return this.country;
  }

  getPosition(): string {
    return this.position;
  }

  getIsSpecial(): boolean {
    return this.isSpecial;
  }

  getImageUrl(): string | undefined {
    return this.imageUrl;
  }

  isFromCountry(country: string): boolean {
    return this.country.toLowerCase() === country.toLowerCase();
  }

  isFromTeam(team: string): boolean {
    return this.team.toLowerCase() === team.toLowerCase();
  }

  equals(other: Sticker): boolean {
    return this.id.equals(other.id);
  }
}