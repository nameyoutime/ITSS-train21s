import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotePageRoutingModule } from './note-page-routing.module';
import { NotePageComponent } from './note-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { NoteEditBodyComponent } from './components/note-edit-body/note-edit-body.component';
import { NoteMenuComponent } from './components/note-menu/note-menu.component';
import { NoteComponent } from './components/note/note.component';
import { EditNoteModalComponent } from './components/note/edit-note-modal/edit-note-modal.component';
import { NoteFlagComponent } from './components/note-flag/note-flag.component';
import { NoteSharedComponent } from './components/note-shared/note-shared.component';
import { NoteSearchComponent } from './components/note-search/note-search.component'
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [NotePageComponent, NewNoteComponent, NoteEditBodyComponent, NoteMenuComponent, NoteComponent, EditNoteModalComponent, NoteFlagComponent, NoteSharedComponent, NoteSearchComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    DragDropModule,
    TextFieldModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    NotePageRoutingModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule
  ]
})
export class NotePageModule { }
