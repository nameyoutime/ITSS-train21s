import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-trash-page',
  templateUrl: './trash-page.component.html',
  styleUrls: ['./trash-page.component.scss']
})
export class TrashPageComponent implements OnInit {

  constructor(public noteServcies:NoteService,public authSer:AuthService) { }

  ngOnInit(): void {
  }
  
  deleteAll() {
    this.noteServcies.deleteAll();
    this.authSer.checkLogin();
  }
}
