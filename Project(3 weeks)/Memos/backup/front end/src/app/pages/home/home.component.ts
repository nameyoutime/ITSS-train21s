import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private notSer:NoteService) { }

  ngOnInit(): void {
  }

  click(){
    console.log(this.notSer.preUserMail,this.notSer.userMail)
  }

}
