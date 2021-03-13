import { Injectable } from '@angular/core';
import { Wine } from '../models/item.models';

@Injectable({
  providedIn: 'root'
})
export class WineDataService {

  constructor() { }


  listWine: Array <Wine> =[{
    id: "Wine 0001",
    name: "Hennesy",
    unitPrice: "123",
    discount: 0.15,
    imgUrl: "https://phanphoiruounhapkhau.com/wp-content/uploads/2018/01/ruou-hennessy-vsop.jpg"
  },{
    id: "Wine 0002",
    name: "X.O",
    discount: 0.15,
    unitPrice: "18",
    imgUrl: "https://phanphoiruounhapkhau.com/wp-content/uploads/2018/01/ruou-hennessy-vsop.jpg"
  },{
    id: "Wine 0001",
    name: "Chivas18",
    discount: 0.15,
    unitPrice: "18",
    imgUrl: "https://phanphoiruounhapkhau.com/wp-content/uploads/2018/01/ruou-hennessy-vsop.jpg"
  },{
    id: "Wine 0001",
    name: "Chivas21",
    discount: 0.15,
    unitPrice: "18",
    imgUrl: "https://phanphoiruounhapkhau.com/wp-content/uploads/2018/01/ruou-hennessy-vsop.jpg"
  },{
    id: "Wine 0001",
    name: "Chivas18",
    discount: 0.15,
    unitPrice: "18",
    imgUrl: "https://phanphoiruounhapkhau.com/wp-content/uploads/2018/01/ruou-hennessy-vsop.jpg"
  },{
    id: "Wine 0001",
    name: "Chivas18",
    discount: 0.15,
    unitPrice: "18",
    imgUrl: "https://phanphoiruounhapkhau.com/wp-content/uploads/2018/01/ruou-hennessy-vsop.jpg"
  },{
    id: "Wine 0001",
    name: "Chivas18",
    discount: 0.15,
    unitPrice: "18",
    imgUrl: "https://phanphoiruounhapkhau.com/wp-content/uploads/2018/01/ruou-hennessy-vsop.jpg"
  },{
    id: "Wine 0001",
    name: "Chivas18",
    discount: 0.15,
    unitPrice: "18",
    imgUrl: "https://phanphoiruounhapkhau.com/wp-content/uploads/2018/01/ruou-hennessy-vsop.jpg"
  }]

  public addWine(Wine:Wine){
    this.listWine.push(Wine);
  }
  public deletWine (pos: number){
    this.listWine = this.listWine.splice(pos, 1);
  }

}
