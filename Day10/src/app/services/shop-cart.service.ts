import { Injectable } from '@angular/core';
import { cartItem } from '../models/cart.models';
import { Item } from '../models/item.models';
import { CartComponent } from '../pages/cart/cart.component';
import { ItemComponent } from '../pages/shop/components/item/item.component';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  constructor() { }

  private items: cartItem[] = [];


  public add(item: Item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].item.id == item.id) {
        this.items[i].quanlity++;
        return;
      }
    }
    this.items.push(new cartItem(item, 1));
  }

  public remove(item: Item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].item.id == item.id) {
        if (this.items[i].quanlity == 0) {
          this.items = this.items.slice(i, 0);
          return;
        }
        this.items[i].quanlity--;
        return;
      }
    }
  }

  // public removeAll(item: Item) {
  //   for (let i = 0; i < this.items.length; i++) {
  //     if (this.items[i].item.id == item.id) {
  //       this.items = this.items.slice(i, 1);
  //       return;
  //     }
  //   }
  // }
  //
  public clear() {
    this.items.length = this.items.length-1;
  }
  
  public clearAll() {
    this.items.length = 0;
  }

  public get grandTotal(): number {
    let total = 0;
    for (let item of this.items) {
      total += item.TotalPrice;
    }
    return total;
  }

  public get cartitems(): cartItem[] {
    return this.items;

  }

  public getQuantityByItem(item: Item): number {
    let r = this.items.find((p) => p.item.id == item.id);
    return r == undefined ? 0 : r.quanlity;
  }

}
