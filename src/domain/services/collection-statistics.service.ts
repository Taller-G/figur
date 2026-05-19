import { Collection } from '../entities/collection.entity';
import { Sticker } from '../entities/sticker.entity';

export interface CollectionStatistics {
  totalStickers: number;
  uniqueStickers: number;
  completionPercentage: number;
  missingStickers: string[];
  duplicateStickers: Array<{ stickerId: string; quantity: number }>;
  specialStickers: number;
  countriesRepresented: string[];
  teamsRepresented: string[];
}

export class CollectionStatisticsService {
  calculateStatistics(
    collection: Collection,
    allAvailableStickers: Sticker[],
  ): CollectionStatistics {
    const collectedStickers = collection.getCollectedStickers();
    const totalStickers = collection.getTotalStickers();
    const uniqueStickers = collection.getUniqueStickersCount();

    // Calculate completion percentage
    const completionPercentage =
      allAvailableStickers.length > 0
        ? (uniqueStickers / allAvailableStickers.length) * 100
        : 0;

    // Find missing stickers
    const collectedStickerIds = new Set(
      collectedStickers.map((cs) => cs.stickerId.getValue()),
    );
    const missingStickers = allAvailableStickers
      .filter((sticker) => !collectedStickerIds.has(sticker.getId().getValue()))
      .map((sticker) => sticker.getId().getValue());

    // Find duplicates (quantity > 1)
    const duplicateStickers = collectedStickers
      .filter((cs) => cs.quantity > 1)
      .map((cs) => ({
        stickerId: cs.stickerId.getValue(),
        quantity: cs.quantity - 1, // Extra copies beyond the first
      }));

    // Count special stickers
    const specialStickers = this.countSpecialStickers(
      collectedStickers,
      allAvailableStickers,
    );

    // Get represented countries and teams
    const { countriesRepresented, teamsRepresented } =
      this.getRepresentedCountriesAndTeams(collectedStickers, allAvailableStickers);

    return {
      totalStickers,
      uniqueStickers,
      completionPercentage: Math.round(completionPercentage * 100) / 100,
      missingStickers,
      duplicateStickers,
      specialStickers,
      countriesRepresented,
      teamsRepresented,
    };
  }

  private countSpecialStickers(
    collectedStickers: Array<{ stickerId: any }>,
    allAvailableStickers: Sticker[],
  ): number {
    const stickerMap = new Map(
      allAvailableStickers.map((s) => [s.getId().getValue(), s]),
    );

    return collectedStickers.filter((cs) => {
      const sticker = stickerMap.get(cs.stickerId.getValue());
      return sticker?.getIsSpecial();
    }).length;
  }

  private getRepresentedCountriesAndTeams(
    collectedStickers: Array<{ stickerId: any }>,
    allAvailableStickers: Sticker[],
  ): { countriesRepresented: string[]; teamsRepresented: string[] } {
    const stickerMap = new Map(
      allAvailableStickers.map((s) => [s.getId().getValue(), s]),
    );

    const countries = new Set<string>();
    const teams = new Set<string>();

    collectedStickers.forEach((cs) => {
      const sticker = stickerMap.get(cs.stickerId.getValue());
      if (sticker) {
        countries.add(sticker.getCountry());
        teams.add(sticker.getTeam());
      }
    });

    return {
      countriesRepresented: Array.from(countries).sort(),
      teamsRepresented: Array.from(teams).sort(),
    };
  }
}