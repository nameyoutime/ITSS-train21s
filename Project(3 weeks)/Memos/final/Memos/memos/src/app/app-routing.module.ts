import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }, 
  { path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: 'promo', loadChildren: () => import('./pages/promo/promo.module').then(m => m.PromoModule) },
  { path: 'note-page', loadChildren: () => import('./pages/note-page/note-page.module').then(m => m.NotePageModule) },
  { path: 'archive-page', loadChildren: () => import('./pages/archive-page/archive-page.module').then(m => m.ArchivePageModule) },
  { path: 'trash-page', loadChildren: () => import('./pages/trash-page/trash-page.module').then(m => m.TrashPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
