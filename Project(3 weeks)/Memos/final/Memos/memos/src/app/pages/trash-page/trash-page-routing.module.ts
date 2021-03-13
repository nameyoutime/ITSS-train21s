import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrashPageComponent } from './trash-page.component';

const routes: Routes = [{ path: '', component: TrashPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrashPageRoutingModule { }
