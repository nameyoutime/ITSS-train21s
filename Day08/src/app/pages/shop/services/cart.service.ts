import { Injectable } from '@angular/core';
import { totalmem } from 'os';
import { cartWine } from '../models/cart-Wine.model';
import { Wine } from '../models/item.models';
import { WineDataService } from './wine-data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private items:cartWine [] =[];

  public add(wine:Wine){
    for(let i=0;i<this.items.length;i++){
      if(this.items[i].wine.id==wine.id){
        this.items[i].quantity++;
        return;
      }
    }
    this.items.push(new cartWine(wine,1));
  }

  public remove(wine:Wine){
    for(let i=0;i<this.items.length;i++){
      if(this.items[i].wine.id==wine.id){
        if(this.items[i].quantity==0) {
          this.items = this.items.splice(i,1);
        }
        this.items[i].quantity--;
        return;
      }
    }
  }

  public removeAllOfAnItem(wine:Wine){
    for(let i=0;i<this.items.length;i++){
      if(this.items[i].wine.id==wine.id){
        this.items = this.items.splice(i,1);
      }
    }
  }

  public clear(){
    this.items.length = 0;
  }

  public get grandTotal(): number{
    let totel = 0;
    for (let items of this.items) {
      total += items.totalPrice;
    }
    return total;
  }

  public get cartItem(): cartWine []{
    return this.items;
  }

  public getQuantityByWine(wine:Wine):number{
    let r = this.items.find((p)=>p.wine.id==WineDataService.id);
    return r ==undefined?0:r.quantity;
  }
}
