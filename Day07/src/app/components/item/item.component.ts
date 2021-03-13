import { Component, Input, OnInit } from '@angular/core';

import {Item} from '../../models/item.models'
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input()
  public item:Item;
}
