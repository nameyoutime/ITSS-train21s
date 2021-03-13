import { Component, Input, OnInit } from '@angular/core';
import { ShopCartService } from '../../../../services/shop-cart.service';
import { Item } from '../../../../models/item.models';
import { DataService } from '../../../../../app/services/data.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(public dataServicies: DataService) { }

  ngOnInit(): void {
  }

  @Input()
  public item: Item;

  public addToCart() {
    let dataLength = this.dataServicies.addToCart.length;
    this.dataServicies.add(this.item);
    // console.log(this.dataServicies.addToCart[dataLength - 1]);
  }
}
