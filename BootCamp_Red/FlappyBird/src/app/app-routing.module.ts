import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule) },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) },
  { path: 'score', loadChildren: () => import('./pages/score/score.module').then(m => m.ScoreModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
