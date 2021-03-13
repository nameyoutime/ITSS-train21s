import { Injectable } from '@angular/core';
import { Item } from '../models/item.models';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public db: AngularFirestore) { }

  public listItem: Array<Item> = [{
    id: 1,
    name: 'Táo',
    price: 10.000,
    outOfStock: false,
    picture: '../../assets/tao.jpg'

  }, {
    id: 2,
    name: 'Bòn Bon',
    price: 13.000,
    outOfStock: false,
    picture: '../../assets/bon-bon.jpg'

  }, {
    id: 3,
    name: 'Bơ',
    price: 14.000,
    outOfStock: false,
    picture: '../../assets/bo.jpg'

  }, {
    id: 4,
    name: 'Bưởi',
    price: 17.000,
    outOfStock: false,
    picture: '../../assets/buoi.jpg'

  }, {
    id: 5,
    name: 'Chanh',
    price: 11.000,
    outOfStock: false,
    picture: '../../assets/chanh.jpg'

  },
  {
    id: 6,
    name: 'Chuối',
    price: 20.000,
    outOfStock: false,
    picture: '../../assets/chuoi.jpg'

  },
  {
    id: 7,
    name: 'Cóc',
    price: 23.000,
    outOfStock: false,
    picture: '../../assets/coc.jpg'

  },
  {
    id: 8,
    name: 'Dâu tây',
    price: 27.000,
    outOfStock: false,
    picture: '../../assets/dau-tay.jpg'

  },
  {
    id: 9,
    name: 'Dưa gang',
    price: 14.000,
    outOfStock: false,
    picture: '../../assets/dua-gang.jpg'

  },
  {
    id: 10,
    name: 'Dưa hấu',
    price: 50.000,
    outOfStock: false,
    picture: '../../assets/dua-hau.jpg'
  }

  ]
  // public createItem(item: Item) {
  //   this.db.collection("items").doc('item.name').set(item);
    
  // }

  public addItem(item: Item) {
    this.listItem.push(item);
  }

  public deleteItem(pos: number) {
    this.listItem = this.listItem.slice(pos, 1);
  }

}
