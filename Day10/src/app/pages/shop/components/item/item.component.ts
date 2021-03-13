import { Component, Input, OnInit } from '@angular/core';
import { ShopCartService } from '../../../../services/shop-cart.service';
import { Item } from '../../../../models/item.models';
import { DataService } from '../../../../../app/services/data.service';
import { cartItem } from 'src/app/models/cart.models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(public cart:ShopCartService) { }

  ngOnInit(): void {
    this.quantity= this.cart.getQuantityByItem(this.item);
  }
  public quantity:number = 0;

  @Input()
  public item: Item;

  public onClickAdd(){
    this.cart.add(this.item);
    this.quantity = this.cart.getQuantityByItem(this.item);
  }
  public onClickRemove(){
    this.cart.remove(this.item);
    this.quantity = this.cart.getQuantityByItem(this.item);
  }

  // public addToCart() {
  //   let dataLength = this.dataServicies.addToCart.length;
  //   this.dataServicies.add(this.item);
  //   // console.log(this.dataServicies.addToCart[dataLength - 1]);
  // }
}
