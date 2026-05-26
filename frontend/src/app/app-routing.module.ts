import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StickerListComponent } from './components/sticker-list/sticker-list.component';
import { CreateStickerComponent } from './components/create-sticker/create-sticker.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/album', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'album', component: StickerListComponent, canActivate: [AuthGuard] },
  { path: 'create-sticker', component: CreateStickerComponent, canActivate: [AuthGuard] },
  { path: 'collections', component: CollectionsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }