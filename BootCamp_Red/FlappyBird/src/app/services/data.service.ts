import { Injectable, Input } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Score } from 'src/app/models/score.models';
import { User } from '../models/user.models';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  scoreCollection: AngularFirestoreCollection<Score>;
  scores: Observable<Score[]>;
  userCollection:AngularFirestoreCollection<User>;
  users:Observable<User[]>;
  constructor(public fire: AngularFirestore) { 
    this.scores = this.fire.collection('score').valueChanges();
    this.users = this.fire.collection('user').valueChanges();
  }

  public chooseBird: any

  images = [
    '../../../assets/yellow.gif',
    '../../../assets/blue.gif',
    '../../../assets/red.gif',
    '../../../assets/pink.gif',
    '../../../assets/robot.gif',
    '../../../assets/3mau.gif'

  ];

  public getBird(x){
    return this.chooseBird = this.images[x]
  }

  getUsers(){
    return this.users;
  }
  getItems() {
    return this.scores;
  }
  // @Input()
  // user:firebase.default.UserInfo;


  // public test() {
  //   let x= this.user.displayName;
  //   alert(x);
  // }
}
