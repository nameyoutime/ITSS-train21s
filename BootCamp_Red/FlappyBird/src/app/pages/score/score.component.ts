import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/models/score.models';
import { User } from 'src/app/models/user.models';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(public itemSer:DataService) { }
  items:Score[];

  ngOnInit(): void {
    this.itemSer.getItems().subscribe(items=>{
      console.log(items);
      this.items = items;
    })

  }



}
