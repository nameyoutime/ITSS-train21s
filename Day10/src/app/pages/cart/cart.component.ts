import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { cartItem } from 'src/app/models/cart.models';
import { Item } from 'src/app/models/item.models';
import { DataService } from 'src/app/services/data.service';
import { ShopCartService } from 'src/app/services/shop-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public Cart:ShopCartService) { }

  ngOnInit(): void {

  }


}
