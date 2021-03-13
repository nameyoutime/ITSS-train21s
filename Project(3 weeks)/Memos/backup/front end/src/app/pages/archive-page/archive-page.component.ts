import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss']
})
export class ArchivePageComponent implements OnInit,OnDestroy {

  constructor(public authSer:AuthService,public noteSer:NoteService) { }

  ngOnInit(): void {
    this.authSer.checkLogin();
  }
  ngOnDestroy():void{

  }

}
