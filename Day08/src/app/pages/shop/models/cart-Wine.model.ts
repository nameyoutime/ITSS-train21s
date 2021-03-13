import { Wine } from "./item.models"

export class cartWine  {
    public wine: Wine;
    public quantity: number;
    public get totalPrice(){
        return this.Wine.price*this.Wine.discount*this.quantity;
    }
    constructor(wine: Wine,quantity:number){
        this.wine = wine;
        this.quantity = quantity;
    }

}