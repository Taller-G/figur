import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, Collection } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collections',
  template: `
    <div class="header">
      <h1>Mis Colecciones</h1>
      <p>Crea y administra tus colecciones de figuritas</p>
    </div>

    <mat-card class="create-collection-card">
      <mat-card-header>
        <mat-card-title>Crear Nueva Colección</mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <form [formGroup]="collectionForm" (ngSubmit)="createCollection()">
          <div class="form-row">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Nombre de la Colección</mat-label>
              <input matInput formControlName="name" placeholder="Mi colección del Mundial">
              <mat-error *ngIf="collectionForm.get('name')?.hasError('required')">
                El nombre es requerido
              </mat-error>
            </mat-form-field>
          </div>
          
          <div class="form-actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="!collectionForm.valid || creating">
              <mat-spinner diameter="20" *ngIf="creating"></mat-spinner>
              {{ creating ? 'Creando...' : 'Crear Colección' }}
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>

    <div *ngIf="loading" class="loading-container">
      <mat-spinner></mat-spinner>
    </div>

    <div *ngIf="collections.length === 0 && !loading" class="no-collections">
      <mat-card>
        <mat-card-content>
          <mat-icon>folder_open</mat-icon>
          <p>No tienes colecciones aún. ¡Crea tu primera colección!</p>
        </mat-card-content>
      </mat-card>
    </div>

    <div class="collections-grid" *ngIf="collections.length > 0">
      <mat-card *ngFor="let collection of collections" class="collection-card">
        <mat-card-header>
          <mat-card-title>{{ collection.name }}</mat-card-title>
          <mat-card-subtitle>ID: {{ collection.id }}</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="collection-stats">
            <div class="stat">
              <mat-icon>collections</mat-icon>
              <span>{{ collection.totalStickers }} figuritas totales</span>
            </div>
            <div class="stat">
              <mat-icon>star</mat-icon>
              <span>{{ collection.uniqueStickers }} únicas</span>
            </div>
          </div>
        </mat-card-content>
        
        <mat-card-actions>
          <button mat-button>
            <mat-icon>visibility</mat-icon>
            Ver Colección
          </button>
          <button mat-button color="primary">
            <mat-icon>add</mat-icon>
            Agregar Figurita
          </button>
        </mat-card-actions>
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

    .create-collection-card {
      max-width: 500px;
      margin: 0 auto 2rem auto;
    }

    .form-row {
      margin-bottom: 1rem;
    }

    .full-width {
      width: 100%;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
    }

    .collections-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-top: 2rem;
    }

    .collection-card {
      height: fit-content;
    }

    .collection-stats {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stat mat-icon {
      color: #666;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .no-collections {
      text-align: center;
      margin-top: 2rem;
    }

    .no-collections mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
      display: block;
      margin: 0 auto 1rem auto;
    }

    mat-spinner {
      margin-right: 8px;
    }
  `]
})
export class CollectionsComponent implements OnInit {
  collectionForm: FormGroup;
  collections: Collection[] = [];
  loading = true;
  creating = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.collectionForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // For demo purposes, we'll show empty collections since we don't have user authentication
    this.loading = false;
    this.collections = [];
  }

  createCollection(): void {
    if (this.collectionForm.valid) {
      this.creating = true;
      
      // Generate a demo user ID for now
      const demoUserId = 'demo-user-' + Math.random().toString(36).substr(2, 9);
      
      const collectionData = {
        ...this.collectionForm.value,
        userId: demoUserId
      };

      this.apiService.createCollection(collectionData).subscribe({
        next: (collection) => {
          this.creating = false;
          this.collections.unshift(collection);
          this.collectionForm.reset();
          this.snackBar.open(`Colección "${collection.name}" creada exitosamente`, 'Cerrar', {
            duration: 3000
          });
        },
        error: (error) => {
          this.creating = false;
          this.snackBar.open('Error al crear la colección', 'Cerrar', {
            duration: 3000
          });
          console.error('Error creating collection:', error);
        }
      });
    }
  }
}