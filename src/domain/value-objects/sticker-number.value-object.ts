export class StickerNumber {
  constructor(private readonly value: number) {
    this.validate();
  }

  private validate(): void {
    if (!Number.isInteger(this.value) || this.value <= 0) {
      throw new Error('Sticker number must be a positive integer');
    }
    
    if (this.value > 999) {
      throw new Error('Sticker number cannot exceed 999');
    }
  }

  getValue(): number {
    return this.value;
  }

  equals(other: StickerNumber): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toString().padStart(3, '0');
  }
}