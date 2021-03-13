import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../../models/item.models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
<<<<<<< HEAD:Day03-W2/Thắng/src/app/components/item/item.component.ts
  @Input()
  public item :Wine;
=======
>>>>>>> f00b4b50e224f99f789c0a7c0e9f3a90d36eda51:Day03-W2/Thiên/src/app/pages/shop/components/item/item.component.ts

  @Input()
  public item:Item;
}
