import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note-model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-search',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.scss']
})
export class NoteSearchComponent implements OnInit {
  @Input() note: Note;
  constructor(public noteServcies:NoteService) { }
  ngOnInit(): void {
  }

}
