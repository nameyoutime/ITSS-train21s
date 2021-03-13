import { Component, OnInit } from '@angular/core';
import { Item } from '../../../app/models/item.models';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public listItem: Array<Item>=[{
    id: 1,
    name:'Táo',
    price:10.000,
    outOfStock:true,
    picture:'../../assets/tao.jpg'

  },{
    id: 2,
    name:'Bòn Bon',
    price:10.000,
    outOfStock:true,
    picture:'../../assets/bon-bon.jpg'

  },{
    id: 3,
    name:'Bơ',
    price:10.000,
    outOfStock:true,
    picture:'../../assets/bo.jpg'

  },{
    id: 4,
    name:'Bưởi',
    price:10.000,
    outOfStock:true,
    picture:'../../assets/buoi.jpg'

  },{
    id: 5,
    name:'Chanh',
    price:10.000,
    outOfStock:true,
    picture:'../../assets/chanh.jpg'

  },
  {
    id: 6,
    name:'Chuối',
    price:10.000,
    outOfStock:true,
    picture:'../../assets/chuoi.jpg'

  },
  {
    id: 7,
    name:'Cóc',
    price:10.000,
    outOfStock:true,
    picture:'../../assets/coc.jpg'

  },
  {
    id: 8,
    name:'Dâu tây',
    price:10.000,
    outOfStock:true,
    picture:'../../assets/dau-tay.jpg'

  },
  {
    id: 9,
    name:'Dưa gang',
    price:10.000,
    outOfStock:true,
    picture:'../../assets/dua-gang.jpg'

  },
  {
    id: 10,
    name:'Dưa hấu',
    price:10.000,
    outOfStock:true,
    picture:'../../assets/dua-hau.jpg'
  }
  
  
  

]
}
