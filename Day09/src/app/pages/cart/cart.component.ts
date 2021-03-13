import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Item } from 'src/app/models/item.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public data: DataService) { }
  public list: Array<Item>

  ngOnInit(): void {
    this.list = this.data.addToCart;
  }

  listLength = this.data.addToCart.length;
  
  compare(){
    for(let i=0;i<this.listLength;i++){
      if(this.list[i]==this.list[i-1]){
        this.list.pop();
      }
    }
  }


}
