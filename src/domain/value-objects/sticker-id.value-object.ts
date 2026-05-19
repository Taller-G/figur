export class StickerId {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value?.trim()) {
      throw new Error('Sticker ID cannot be empty');
    }
    
    if (this.value.length > 50) {
      throw new Error('Sticker ID cannot exceed 50 characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: StickerId): boolean {
    return this.value === other.value;
  }

  static generate(): StickerId {
    return new StickerId(Math.random().toString(36).substring(2, 15));
  }
}