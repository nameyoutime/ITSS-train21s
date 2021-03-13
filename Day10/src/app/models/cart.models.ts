import { Item } from "./item.models";

export class cartItem {
    item: Item;
    quanlity: number;
    public get TotalPrice(){
        return this.item.price*this.quanlity;
    }
    constructor(item: Item, quanlity: number) {
        this.item = item;
        this.quanlity = quanlity;
    }
}