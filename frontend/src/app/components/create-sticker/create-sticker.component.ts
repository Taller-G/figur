import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-sticker',
  template: `
    <div class="header">
      <h1>Crear Nueva Figurita</h1>
      <p>Agrega una nueva figurita a la colección</p>
    </div>

    <mat-card class="form-card">
      <mat-card-content>
        <form [formGroup]="stickerForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <mat-form-field appearance="fill" class="half-width">
              <mat-label>Número</mat-label>
              <input matInput type="number" formControlName="number" min="1" max="999">
              <mat-error *ngIf="stickerForm.get('number')?.hasError('required')">
                El número es requerido
              </mat-error>
              <mat-error *ngIf="stickerForm.get('number')?.hasError('min') || stickerForm.get('number')?.hasError('max')">
                El número debe estar entre 1 y 999
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="half-width">
              <mat-label>Nombre del Jugador</mat-label>
              <input matInput formControlName="playerName">
              <mat-error *ngIf="stickerForm.get('playerName')?.hasError('required')">
                El nombre del jugador es requerido
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="fill" class="half-width">
              <mat-label>Equipo</mat-label>
              <input matInput formControlName="team">
              <mat-error *ngIf="stickerForm.get('team')?.hasError('required')">
                El equipo es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="half-width">
              <mat-label>País</mat-label>
              <mat-select formControlName="country">
                <mat-option value="Argentina">Argentina</mat-option>
                <mat-option value="Brasil">Brasil</mat-option>
                <mat-option value="España">España</mat-option>
                <mat-option value="Francia">Francia</mat-option>
                <mat-option value="Alemania">Alemania</mat-option>
                <mat-option value="Inglaterra">Inglaterra</mat-option>
                <mat-option value="Portugal">Portugal</mat-option>
                <mat-option value="Países Bajos">Países Bajos</mat-option>
              </mat-select>
              <mat-error *ngIf="stickerForm.get('country')?.hasError('required')">
                El país es requerido
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="fill" class="half-width">
              <mat-label>Posición</mat-label>
              <mat-select formControlName="position">
                <mat-option value="Portero">Portero</mat-option>
                <mat-option value="Defensa">Defensa</mat-option>
                <mat-option value="Mediocampista">Mediocampista</mat-option>
                <mat-option value="Delantero">Delantero</mat-option>
              </mat-select>
              <mat-error *ngIf="stickerForm.get('position')?.hasError('required')">
                La posición es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="half-width">
              <mat-label>URL de la Imagen (opcional)</mat-label>
              <input matInput formControlName="imageUrl" type="url">
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-checkbox formControlName="isSpecial">
              Figurita Especial
            </mat-checkbox>
          </div>

          <div class="form-actions">
            <button mat-button type="button" (click)="onCancel()">
              Cancelar
            </button>
            <button mat-raised-button color="primary" type="submit" [disabled]="!stickerForm.valid || loading">
              <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
              {{ loading ? 'Creando...' : 'Crear Figurita' }}
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
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

    .form-card {
      max-width: 600px;
      margin: 0 auto;
    }

    .form-row {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .half-width {
      flex: 1;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }

    mat-spinner {
      margin-right: 8px;
    }
  `]
})
export class CreateStickerComponent {
  stickerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.stickerForm = this.fb.group({
      number: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
      playerName: ['', Validators.required],
      team: ['', Validators.required],
      country: ['', Validators.required],
      position: ['', Validators.required],
      imageUrl: [''],
      isSpecial: [false]
    });
  }

  onSubmit(): void {
    if (this.stickerForm.valid) {
      this.loading = true;
      
      this.apiService.createSticker(this.stickerForm.value).subscribe({
        next: (sticker) => {
          this.loading = false;
          this.snackBar.open(`Figurita #${sticker.number} creada exitosamente`, 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/stickers']);
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open('Error al crear la figurita', 'Cerrar', {
            duration: 3000
          });
          console.error('Error creating sticker:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/stickers']);
  }
}