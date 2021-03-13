import { Component, OnInit, ChangeDetectionStrategy,OnChanges } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit,OnChanges {
  value:'';
  constructor(public noteSer:NoteService) { }

  ngOnInit(): void {
  }
  ngOnChanges():void {
    
  }
  check(){
    // console.log(this.value)
    this.noteSer.search(this.value);
  }
  clearFiltter(){
    this.noteSer.filter = [];
  }

}
