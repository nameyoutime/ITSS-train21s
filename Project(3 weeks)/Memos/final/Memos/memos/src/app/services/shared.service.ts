import { Component, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { sample } from 'rxjs/operators';
import { NoteService } from "./note.service"
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  colors: string[] = [
    // Available menu colors
    "#fefefe",
    "#f28c80",
    "#f6bf02",
    "#fff478",
    "#cdfe91",
    "#a6fdea",
    "#cdeff8",
    "#afcbfa",
    "#d5affc",
    "#fdcfe9",
    "#e2cba9",
    "#e9eaee",
  ];
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog,private noteSer: NoteService, public fire: AngularFirestore, private fireData: AngularFireStorage) { }
  checkEmail(email: string) {
    let user1 = this.noteSer.getUserMail;
    let user = email;
    if (user1 == user) {
      console.log("same user!")
    } else {
      let data: any;
      this.fire.collection("user").doc(user).valueChanges().subscribe((temp) => {
        data = temp;
        if (data == undefined) {
          console.log("can't get shared");
        } else {
          this.fire.collection("user").doc(user).collection("shared").doc(user1).set({ email: user1 })
        }
      });
    }

  }

  checkEmailExist(email: string) {
    let user1 = this.noteSer.getUserMail;
    let user = email;
    if (user1 == user) {
      console.log("same user")
    } else {
      let data: any;
      this.fire.collection("user").doc(user).valueChanges().subscribe((temp) => {
        data = temp;
        if (data == undefined) {
          console.log('undefined');
        } else {
          console.log("true");
        }
      });
    }

  }
  checkEmailShared(id, email) {
    let page = "note";
    let currentUser = this.noteSer.getUserMail;
    let sharedUser = email;
    if (currentUser == sharedUser) {
        this.dialog.open(dialogSameUser);
    } else {
      let data: any;
      this.fire.collection("user").doc(sharedUser).valueChanges().subscribe((temp) => {
        data = temp;

        if (data == undefined) {
          this.dialog.open(dialogCantShare);
        } else {
          // console.log(data);
          let dataNote = this.noteSer.getNote(id)
          // console.log(dataNote);
          if (page == "note") {
            dataNote.shareFrom = currentUser;
            dataNote.shareTo = sharedUser;
          }
          this.fire.collection("user").doc(currentUser).collection("notes").doc(id).update({ shareTo: sharedUser, shareFrom: currentUser });

          this.fire.collection("user").doc(sharedUser).collection("sharedNote").doc(currentUser).collection("notes").doc(dataNote.id).set(dataNote);
          this.fire.collection("user").doc(sharedUser).collection("sharedNote").doc(currentUser).set({ email: currentUser });
          this.dialog.closeAll();
          this._snackBar.openFromComponent(SnackBarShare, {
            duration: 1 * 1000,
          });
        }
      });
    }

  }

  public NoteSharedData: any;
  public NoteSharedDataLength: any;
  addNoteShared(email) {
    let currentUser = this.noteSer.getUserMail;
    let sharedUser = email;
    let temp: Observable<any>
    temp = this.fire.collection("user").doc(currentUser).collection("sharedNote").doc(sharedUser).collection("notes").valueChanges();
    temp.subscribe(data => {
      this.NoteSharedData = data;
      this.NoteSharedDataLength = data.length;
      console.log(this.NoteSharedData);

    })
    // console.log(temp);
  }


  

  getColorById(id, page) {
    for (let i = 0; i < this.NoteSharedData.length; i++) {
      if (this.NoteSharedData[i].id == id) {
        return this.NoteSharedData[i].color;
      }

    }
  }
  get getNoteSharedData() {
    return this.NoteSharedData;
  }
  changColorById(i, id, shareFrom, shareTo) {
    let currentUser = this.noteSer.getUserMail;
    let sharedUser = shareFrom;
    this.fire.collection("user").doc(sharedUser).collection("notes").doc(id).update({ color: this.colors[i] })
    this.fire.collection("user").doc(currentUser).collection("sharedNote").doc(sharedUser).collection("notes").doc(id).update({ color: this.colors[i] })
  }

}

@Component({
  selector: 'dialogSameUser',
  templateUrl: 'dialogSameUser.html',
})
export class dialogSameUser {
  constructor(public dialogRef: MatDialogRef<dialogSameUser>){}
  close(){
    this.dialogRef.close();
  }
  
}

@Component({
  selector: 'dialogCantShare',
  templateUrl: 'dialogCantShare.html',
})
export class dialogCantShare {
  constructor(public dialogRef: MatDialogRef<dialogCantShare>){}
  close(){
    this.dialogRef.close();
  }
  
}


@Component({
  selector: 'SnackBarShare',
  templateUrl: 'SnackBarShare.html',

})
export class SnackBarShare {}