export class CollectionId {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value?.trim()) {
      throw new Error('Collection ID cannot be empty');
    }
    
    if (this.value.length > 50) {
      throw new Error('Collection ID cannot exceed 50 characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CollectionId): boolean {
    return this.value === other.value;
  }

  static generate(): CollectionId {
    return new CollectionId(Math.random().toString(36).substring(2, 15));
  }
}