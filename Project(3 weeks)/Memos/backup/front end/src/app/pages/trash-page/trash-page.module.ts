import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { TrashPageRoutingModule } from './trash-page-routing.module';
import { TrashPageComponent } from './trash-page.component';
import { NoteTrashComponent } from './components/note-trash/note-trash.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [TrashPageComponent, NoteTrashComponent],
  imports: [
    CommonModule,
    TrashPageRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class TrashPageModule { }
