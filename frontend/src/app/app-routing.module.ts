import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StickerListComponent } from './components/sticker-list/sticker-list.component';
import { CreateStickerComponent } from './components/create-sticker/create-sticker.component';
import { CollectionsComponent } from './components/collections/collections.component';

const routes: Routes = [
  { path: '', redirectTo: '/stickers', pathMatch: 'full' },
  { path: 'stickers', component: StickerListComponent },
  { path: 'create-sticker', component: CreateStickerComponent },
  { path: 'collections', component: CollectionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }