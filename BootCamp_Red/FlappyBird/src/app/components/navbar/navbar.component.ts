import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'


import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private auth: AngularFireAuth, private router: Router, public fire: AngularFirestore) { }

  public user: firebase.default.UserInfo;
  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    })

  }

  ngOnDestroy(): void {
    this.user = null;
  }
  async logIn() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    // this.tranferName();
    try {
      await this.auth.signInWithPopup(provider);

      this.router.navigate(['main']);
      // this.tranferName();
    } catch (err) {
      alert("failed");
    }

  }
  async logOut() {
    try {
      await this.auth.signOut();
      this.user = null;
      this.router.navigate(['']);
    } catch (err) {
      alert("Sigout failed");
    }
  }
  public tranferName() {
    // alert(score);
    let userName = this.user.displayName;
    let Record = {};
    Record['name'] = userName;
    this.fire.collection('user').add(Record);
    alert(userName);
  }

  // public tranfer(){
  //   alert(this.user.displayName);
  //   return this.user.displayName;
  // }



}
