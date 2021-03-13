import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';


@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
