import { Component, OnInit } from '@angular/core';
import { ApiService, Sticker } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sticker-list',
  template: `
    <div class="header">
      <h1>Figuritas del Mundial</h1>
      <p>Colecciona todas las figuritas de tus jugadores favoritos</p>
    </div>

    <div *ngIf="loading" class="loading-container">
      <mat-spinner></mat-spinner>
    </div>

    <div *ngIf="error" class="error-message">
      <mat-icon>error</mat-icon>
      {{ error }}
    </div>

    <div *ngIf="!loading && !error" class="card-grid">
      <app-sticker-card 
        *ngFor="let sticker of stickers" 
        [sticker]="sticker"
        (stickerAction)="onStickerAction($event)">
      </app-sticker-card>
    </div>

    <div *ngIf="!loading && !error && stickers.length === 0" class="no-data">
      <mat-card>
        <mat-card-content>
          <p>No hay figuritas disponibles. ¡Crea la primera!</p>
          <button mat-raised-button color="primary" routerLink="/create-sticker">
            <mat-icon>add</mat-icon>
            Crear Figurita
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      color: #1976d2;
      margin-bottom: 0.5rem;
    }

    .no-data {
      text-align: center;
      margin-top: 2rem;
    }
  `]
})
export class StickerListComponent implements OnInit {
  stickers: Sticker[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStickers();
  }

  loadStickers(): void {
    this.loading = true;
    this.error = null;
    
    this.apiService.getStickers().subscribe({
      next: (stickers) => {
        this.stickers = stickers;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error cargando las figuritas';
        this.loading = false;
        console.error('Error loading stickers:', error);
      }
    });
  }

  onStickerAction(event: { action: string, sticker: Sticker }): void {
    switch (event.action) {
      case 'view':
        this.snackBar.open(`Figurita #${event.sticker.number}: ${event.sticker.playerName}`, 'Cerrar', {
          duration: 3000
        });
        break;
      case 'collect':
        this.snackBar.open(`¡Figurita de ${event.sticker.playerName} agregada a la colección!`, 'Cerrar', {
          duration: 2000
        });
        break;
    }
  }
}