import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Item } from '../../../../models/item.models';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  constructor(private dataServices: DataService) { }
  public listItem: Array<Item> ;

  ngOnInit(): void {
    this.listItem= this.dataServices.listItem;
  }
  

}
