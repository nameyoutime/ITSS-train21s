import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivePageRoutingModule } from './archive-page-routing.module';
import { ArchivePageComponent } from './archive-page.component';
import { NoteComponent } from './components/note/note.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [ArchivePageComponent, NoteComponent],
  imports: [
    CommonModule,
    ArchivePageRoutingModule,
    MatProgressBarModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class ArchivePageModule { }
