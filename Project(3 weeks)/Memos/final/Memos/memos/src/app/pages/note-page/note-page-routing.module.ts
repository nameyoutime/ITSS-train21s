import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotePageComponent } from './note-page.component';

const routes: Routes = [{ path: '', component: NotePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotePageRoutingModule { }
