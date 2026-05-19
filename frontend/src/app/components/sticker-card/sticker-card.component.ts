import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Sticker } from '../../services/api.service';

@Component({
  selector: 'app-sticker-card',
  template: `
    <mat-card class="sticker-card">
      <mat-card-header>
        <mat-card-title>
          #{{ sticker.number.toString().padStart(3, '0') }}
          <mat-chip *ngIf="sticker.isSpecial" color="accent" selected>ESPECIAL</mat-chip>
        </mat-card-title>
        <mat-card-subtitle>{{ sticker.country }}</mat-card-subtitle>
      </mat-card-header>

      <div class="sticker-image" *ngIf="sticker.imageUrl">
        <img [src]="sticker.imageUrl" [alt]="sticker.playerName" />
      </div>
      
      <div class="sticker-placeholder" *ngIf="!sticker.imageUrl">
        <mat-icon>person</mat-icon>
      </div>

      <mat-card-content>
        <h3>{{ sticker.playerName }}</h3>
        <div class="sticker-details">
          <p><strong>Equipo:</strong> {{ sticker.team }}</p>
          <p><strong>Posición:</strong> {{ sticker.position }}</p>
        </div>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button (click)="onAction('view')">
          <mat-icon>visibility</mat-icon>
          Ver
        </button>
        <button mat-button color="primary" (click)="onAction('collect')">
          <mat-icon>add</mat-icon>
          Coleccionar
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .sticker-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .sticker-image {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
    }

    .sticker-image img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .sticker-placeholder {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
    }

    .sticker-placeholder mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
    }

    mat-card-content {
      flex-grow: 1;
    }

    mat-card-content h3 {
      margin-top: 0;
      color: #1976d2;
    }

    .sticker-details p {
      margin: 4px 0;
      font-size: 0.9em;
    }

    mat-card-actions {
      justify-content: space-between;
    }

    mat-chip {
      font-size: 0.7em;
      height: 20px;
      margin-left: 8px;
    }
  `]
})
export class StickerCardComponent {
  @Input() sticker!: Sticker;
  @Output() stickerAction = new EventEmitter<{ action: string, sticker: Sticker }>();

  onAction(action: string): void {
    this.stickerAction.emit({ action, sticker: this.sticker });
  }
}