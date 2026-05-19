import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <mat-icon>sports_soccer</mat-icon>
      <span style="margin-left: 10px;">Figuritas del Mundial</span>
      <span class="toolbar-spacer"></span>
      
      <button mat-button routerLink="/stickers">
        <mat-icon>collections</mat-icon>
        Figuritas
      </button>
      
      <button mat-button routerLink="/create-sticker">
        <mat-icon>add</mat-icon>
        Nueva Figurita
      </button>
      
      <button mat-button routerLink="/collections">
        <mat-icon>folder</mat-icon>
        Colecciones
      </button>
    </mat-toolbar>
    
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Figuritas del Mundial';
}