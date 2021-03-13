import { Component, Input, OnInit } from '@angular/core';
import { cartItem } from 'src/app/models/cart.models';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  constructor() { }

  @Input()
  cartItem:cartItem;
  
  ngOnInit(): void {
  }

}
