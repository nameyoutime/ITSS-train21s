import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class InOutService implements OnInit {

  constructor(public aAuth: AngularFireAuth) { }
  
  ngOnInit(): void {
    
  }
  public async login() {
    var provider = new firebase.default.auth.GoogleAuthProvider();
    await this.aAuth.signInWithPopup(provider);
    alert("login suscess!");
  }
  public async logout() {
    try {
      await this.aAuth.signOut();
      window.location.reload();
      alert("log out sucess!");
    } catch (err) {
      alert("log out failed!");
    }


  }
}
