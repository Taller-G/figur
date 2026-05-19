export class PlayerName {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value?.trim()) {
      throw new Error('Player name cannot be empty');
    }
    
    if (this.value.length > 100) {
      throw new Error('Player name cannot exceed 100 characters');
    }

    // Basic name validation - only letters, spaces, hyphens, apostrophes
    const namePattern = /^[a-zA-ZÀ-ÿ\s\-'\.]+$/;
    if (!namePattern.test(this.value)) {
      throw new Error('Player name contains invalid characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  getFirstName(): string {
    return this.value.split(' ')[0];
  }

  getLastName(): string {
    const parts = this.value.split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  equals(other: PlayerName): boolean {
    return this.value === other.value;
  }
}