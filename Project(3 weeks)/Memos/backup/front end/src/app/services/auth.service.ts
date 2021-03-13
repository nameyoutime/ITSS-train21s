import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { observable, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { NoteService } from './note.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: firebase.default.UserInfo;
  public openNav: boolean;
  authState: any = null;
  constructor(private auth: AngularFireAuth,private router: Router,private noteSer:NoteService) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.authState=user;
        this.user = user;
        this.noteSer.addUserMail(user.email);
        this.openNavBar();
        this.router.navigate(['note-page']);
        
        
      }else{
        this.disableNavBar();
      }
    });
  }
  checkLogin(){
    setTimeout(() => {
      if(this.user==undefined){
        this.router.navigate(['sign-in']);
      }else{
        
      }
    },500);
  }


  openNavBar(){
    this.openNav=true;
    
    return this.openNav;
  }
  disableNavBar(){
    this.openNav=false;
    return this.openNav;
  }

  login() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    try {
      
      this.auth.signInWithPopup(provider);

      
    }
    catch (err) {
      // alert("login failed");
    }
  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

registerWithEmail(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  

  loginWithEmail(email: string, password: string)
  {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email)
      .then(() => console.log('sent Password Reset Email!'))
      .catch((error) => {
        console.log(error)
        throw error
      })
  }
  
  signOut() {
    try {
      this.noteSer.deleteUserMail();
      this.auth.signOut();
      this.user = null;
      this.noteSer.userMail = undefined;
      this.noteSer.preUserMail = undefined;
      this.noteSer.getData();
      this.router.navigate(['']);
      setTimeout(() => {
        window.location.reload();
      }, 10);
      
    } catch (err) {
      // alert("Sigout failed");

    }
  }

}
