export class UserId {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value?.trim()) {
      throw new Error('User ID cannot be empty');
    }
    
    if (this.value.length > 50) {
      throw new Error('User ID cannot exceed 50 characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }

  static generate(): UserId {
    return new UserId(Math.random().toString(36).substring(2, 15));
  }
}