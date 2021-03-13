import { Component, Injectable, OnInit } from '@angular/core';
import { Note } from '../models/note-model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestoreCollectionGroup, validateEventsArray } from "@angular/fire/firestore"
import { Observable } from 'rxjs';
import { finalize, share } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import { arch } from 'node:os';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnInit {
  public filter: Note[];
  public notes: Note[];
  public notes1: Note[];
  public trashs: Note[];
  public archive: Note[];
  public flag: Note[];
  public img: Note[];
  public userMail: any;
  public preUserMail: any;

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



  constructor(private _snackBar: MatSnackBar,private http: HttpClient, public fire: AngularFirestore, private fireData: AngularFireStorage) {
    this.filter = [];
    this.shared = [];
    this.img = [];
    this.notes = [];
    this.notes1 = [];
    this.trashs = [];
    this.archive = [];
    this.flag = [];
    this.getData();
    this.getId();
  }
  ngOnInit(): void {
  }


  public changeNotes(indexPre, indexCur) {
    let id = this.notes[indexPre].id;
    let id1 = this.notes[indexCur].id;
    let data = this.notes[indexPre];
    let data1 = this.notes[indexCur];
    data.id = id1;
    data1.id = id;
    this.fire.doc(`user/user1/notes/${id}`).delete();
    this.fire.doc(`user/user1/notes/${id1}`).delete();
    this.fire.collection("user").doc("user1").collection("notes").doc(data.id.toString()).set(data);
    this.fire.collection("user").doc("user1").collection("notes").doc(data1.id.toString()).set(data1);
  }

  public changeFlag(indexPre, indexCur) {
    let id = this.flag[indexPre].id;
    let id1 = this.flag[indexCur].id;
    let data = this.flag[indexPre];
    let data1 = this.flag[indexCur];
    data.id = id1;
    data1.id = id;
    this.fire.doc(`user/user1/flags/${id}`).delete();
    this.fire.doc(`user/user1/flags/${id1}`).delete();
    this.fire.collection("user").doc("user1").collection("flags").doc(data.id.toString()).set(data);
    this.fire.collection("user").doc("user1").collection("flags").doc(data1.id.toString()).set(data1);
  }

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  public changeImgURL(event, id, pin, page) {
    let file = event.target.files[0];
    let n = file.name;
    let filePath = `RoomsImages/${n}`;
    let fileRef = this.fireData.ref(filePath);
    let task = this.fireData.upload(`RoomsImages/${n}`, file);
    console.log(task);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            this.fb;
            this.img[0] = this.fb;
            this.changeImg(id, page, this.fb, pin);

          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });
  }
  public changeImgURLShared(event, id, shareFrom,shareTo) {
    let file = event.target.files[0];
    let n = file.name;
    let filePath = `RoomsImages/${n}`;
    let fileRef = this.fireData.ref(filePath);
    let task = this.fireData.upload(`RoomsImages/${n}`, file);
    console.log(task);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            this.fb;
            this.changeImgShared(id,this.fb,shareFrom,shareTo)
            

          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });
  }
  public async changeImgShared(id, img: string, shareFrom,shareTo) {

    let user1 = this.userMail;
    let temp = {
      id: id,
      img: img,
      shareFrom:shareFrom,
      shareTo:shareTo
    }
    // console.log(temp);
    await this.http.put(environment.endpoint + "shared/id/update/img", temp).toPromise();
    
  }

  addUserMail(email) {
    this.userMail = email;
    this.preUserMail = email;
    this.getUserShared();
    this.getData();
  }
  deleteUserMail() {
    this.userMail = undefined;
    this.preUserMail = undefined;
    // this.getData();
  }

  public get getMail() {
    let temp: string;
    temp = this.userMail;
    return temp;
  }
  public id: any;
  public getId() {
    let id: Observable<any>;
    id = this.fire.collection("user").doc("id").valueChanges();
    id.subscribe((data) => {
      this.id = data.id.toString();
    })

  }

  public shared: any;
  getUserShared() {
    let user1 = this.userMail;
    let shared: Observable<any>;
    shared = this.fire.collection("user").doc(user1).collection("shared").valueChanges();
    shared.subscribe((data) => {
      this.shared = data;
      return this.shared.length;
    })
  }



  public sharedNote: any;
  getUserNoteShared() {
    let currentUser = this.userMail;
    let shared: Observable<any>;
    shared = this.fire.collection("user").doc(currentUser).collection("sharedNote").valueChanges();
    shared.subscribe((data) => {
      this.sharedNote = data;
    })
  }
  public sharedNoteUser: any
  checkUserSharedNoteTo() {

  }

  check() {
    console.log(this.shared);

  }
  public get getShared() {
    return this.shared;
  }
  public get getSharedNote() {
    return this.sharedNote;
  }

  public activeShared(email) {
    this.userMail = email;
    this.getData();
  }
  public get getUserMail() {
    return this.userMail;
  }
  public changeBack() {
    this.userMail = this.preUserMail;
    this.getData();
  }

  // Example note
  getDefaultNote(): Note {
    return {
      id: "", title: 'firsttitle', description: 'firstdescription', pin: false, notes: true,
      labels: [], selectedColor: 0, color: '#fefefe', todoList: [], imagePreview: "",
      showTodo: false, arhieved: false, trash: false, shareFrom: "", shareTo: ''
    };
  }
  // Generate emptyNote
  getEmptyNote(): Note {
    return {
      id: "", title: "", description: "", labels: [], selectedColor: 0, pin: false, imagePreview: "", notes: true,
      color: '#fefefe', todoList: [], showTodo: false, arhieved: false, trash: false, num: this.notes.length + 1,
      shareFrom: "", shareTo: ''
    }
  }


  // Note empty checking logic
  checkNoteIsEmpty(note: Note) {
    if (note.title || note.description || note.imagePreview ||
      (note.todoList.length && note.showTodo)) return false;
    else return true;
  }
  getNote(id) {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id == id) {
        return this.notes[i];
      }
    }
  }


  public async addNote(newNote: Note) {
    let user1 = this.userMail;
    newNote.id = this.id;
    newNote.notes = true;
    newNote.shareFrom = this.userMail;

    let temp = {
      email: user1
    }
    this.fire.collection("user").doc(user1).set(temp);
    // this.fire.collection("user").doc(user1).collection("notes").doc(this.id).set(newNote);
    await this.http.post(environment.endpoint + "notes/create", newNote).toPromise();
    this.fire.collection("user").doc("id").update({ id: parseInt(this.id) + 1 })
  }

  getData() {
    this.getNotesData();
    this.getNotes1Data();
    this.getFlagsData();
    this.getArchivesData();
    this.getTrashData();
    this.getUserShared();
    this.getUserNoteShared();
    this.checkUserSharedNoteTo();
  }
  public getNotesData() {

    let user1 = this.userMail;
    let notes: Observable<any[]>;
    notes = this.fire.collection("user").doc(user1).collection("notes").valueChanges();
    notes.subscribe((data) => {
      this.notes = data;
    })
  }
  public getNotes1Data() {
    let user1 = this.userMail;
    let notes1: Observable<any[]>;
    notes1 = this.fire.collection("user").doc(user1).collection("notes1").valueChanges();
    notes1.subscribe((data) => {
      this.notes1 = data;
    })
  }


  public getFlagsData() {
    let user1 = this.userMail;
    let flags: Observable<any[]>;
    flags = this.fire.collection("user").doc(user1).collection("flags").valueChanges();
    flags.subscribe((data) => {
      this.flag = data;
    })
  }

  public async updateTitile(id, update, page) {
    let currentUser = this.userMail;
    let temp = {
      id:id,
      update:update,
      user:currentUser
    }
    if (page == 'notes') {
      //change title in notes
      await this.http.put(environment.endpoint + "notes/id/update/title", temp).toPromise();
      // this.fire.collection("user").doc(currentUser).collection("notes").doc(id).update({ title: update });
    } else if (page == 'flags') {
      await this.http.put(environment.endpoint + "flags/id/update/title", temp).toPromise();
      // this.fire.collection("user").doc(currentUser).collection("flags").doc(id).update({ title: update });
      //change title in flags
    } else if (page == 'archives') {
      await this.http.put(environment.endpoint + "archives/id/update/title", temp).toPromise();
      // this.fire.collection("user").doc(currentUser).collection("archives").doc(id).update({ title: update });
      //change title in archives
    }
  }
  public async updateTitileShared(id, update,shareFrom,sharedTo) {
    let currentUser = this.userMail;
    let temp = {
      id:id,
      update:update,
      shareFrom:shareFrom,
      shareTo:sharedTo
    }
    // console.log(temp);
    // console.log(temp);
  //change title in notes
      await this.http.put(environment.endpoint + "shared/id/update/title", temp).toPromise();
      // this.fire.collection("user").doc(currentUser).collection("notes").doc(id).update({ title: update });

  }
  public async updateDescriptionShared(id, update,shareFrom,sharedTo) {
    let currentUser = this.userMail;
    let temp = {
      id:id,
      update:update,
      shareFrom:shareFrom,
      shareTo:sharedTo
    }

    // console.log(temp);
  //change title in notes
      await this.http.put(environment.endpoint + "shared/id/update/description", temp).toPromise();
      // this.fire.collection("user").doc(currentUser).collection("notes").doc(id).update({ title: update });

  }
  public async updateBothShared(id, update,update1,shareFrom,sharedTo) {
    let currentUser = this.userMail;
    
    let temp = {
      id:id,
      update:update,
      update1:update1,
      shareFrom:shareFrom,
      shareTo:sharedTo
    }

    // console.log(temp);
  //change title in notes
      await this.http.put(environment.endpoint + "shared/id/update/both", temp).toPromise();
      // this.fire.collection("user").doc(currentUser).collection("notes").doc(id).update({ title: update });

  }
  public async updateDescription(id, update, page) {
    let currentUser = this.userMail;
    let temp = {
      id:id,
      update:update,
      user:currentUser
    }
    if (page == 'notes') {
      //change Description in notes
      await this.http.put(environment.endpoint + "notes/id/update/description", temp).toPromise();
      // this.fire.collection("user").doc(currentUser).collection("notes").doc(id).update({ description: update });
    } else if (page == 'flags') {
      // this.fire.collection("user").doc(currentUser).collection("flags").doc(id).update({ description: update });
      await this.http.put(environment.endpoint + "flags/id/update/description", temp).toPromise();
      //change Description in flags
    } else if (page == 'archives') {
      this.fire.collection("user").doc(currentUser).collection("archives").doc(id).update({ description: update });
      //change Description in archives
      await this.http.put(environment.endpoint + "archives/id/update/description", temp).toPromise();
    }
  }
  public async updateBoth(id, title, description, page) {
    let currentUser = this.userMail;
    let temp = {
      id:id,
      update:title,
      update1:description,
      user:currentUser
    }
    if (page == 'notes') {
      //change Description in notes

      // console.log("update notes both");
      await this.http.put(environment.endpoint + "notes/id/update/both", temp).toPromise();
      // this.fire.collection("user").doc(currentUser).collection("notes").doc(id).update({ title: title, description: description });
    } else if (page == 'flags') {
      await this.http.put(environment.endpoint + "flags/id/update/both", temp).toPromise();
      // this.fire.collection("user").doc(currentUser).collection("flags").doc(id).update({ title: title, description: description });
      //change Description in flags
    } else if (page == 'archives') {
      await this.http.put(environment.endpoint + "archives/id/update/both", temp).toPromise();
      // this.fire.collection("user").doc(currentUser).collection("archives").doc(id).update({ title: title, description: description });
      //change Description in archives
    }
  }

  public getArchivesData() {
    let user1 = this.userMail;
    let archives: Observable<any[]>;
    archives = this.fire.collection("user").doc(user1).collection("archives").valueChanges();
    archives.subscribe((data) => {
      this.archive = data;
    })
  }



  public getTrashData() {
    let user1 = this.userMail;
    let trashs: Observable<any[]>;
    trashs = this.fire.collection("user").doc(user1).collection("trashs").valueChanges();
    trashs.subscribe((data) => {
      let temp: any;
      temp = data;
      this.trashs = temp;
    })
  }

  public async deleteInTrash(numb: String) {
    let user1 = this.userMail;
    let id = numb;
    let urlDelTrashs = `${environment.endpoint}trashs/id/delete?id=${id}&user1=${user1}`;
    await this.http.delete(urlDelTrashs).toPromise();
    this.openSnackBarDel();
    
    // this.fire.collection("user").doc(user1).collection("trashs").doc(id.toString()).delete();
  }
  openSnackBarDel() {
    this._snackBar.openFromComponent(SnackBarDel, {
      duration: 1 * 1000,
    });
  }
  openSnackBarRestore() {
    this._snackBar.openFromComponent(SnackBarRestore, {
      duration: 1 * 1000,
    });
  }
  openSnackBarArchive() {
    this._snackBar.openFromComponent(SnackBarArchive, {
      duration: 1 * 1000,
    });
  }

  //unness
  public async tranferToNotes(notes) {
    let user1 = this.userMail;
    if (notes.notes == true) {
      notes.notes = false;
      this.fire.collection("user").doc(user1).collection("notes1").doc(notes.id.toString()).set(notes);
      this.fire.collection("user").doc(user1).collection("notes").doc(notes.id.toString()).delete();

    } else if (notes.notes == false) {
      notes.notes = true;
      this.fire.collection("user").doc(user1).collection("notes1").doc(notes.id.toString()).delete();
      this.fire.collection("user").doc(user1).collection("notes").doc(notes.id.toString()).set(notes);
    }


  }
  public async addToTrash(id: String, shareTo) {
    let user1 = this.userMail;
    if (shareTo == undefined || shareTo == "") {

    } else {
      this.fire.collection("user").doc(shareTo).collection("sharedNote").doc(user1).collection("notes").doc(id.toString()).delete();
    }
    let urlDelNotes = `${environment.endpoint}notes/id/delete?id=${id}&user1=${user1}`;
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id == id) {
        // this.notes[i].pin = false;
        this.notes[i].shareTo="";
        // this.fire.collection("user").doc(user1).collection("notes").doc(id.toString()).delete();
        await this.http.post(environment.endpoint + "trashs/create", this.notes[i]).toPromise();
        await this.http.delete(urlDelNotes).toPromise();
        // this.fire.collection("user").doc(user1).collection("trashs").doc(id.toString()).set(this.notes[i]);
        
        this.openSnackBarDel();
      }
    }
  }
  public async add1ToTrash(id: String) {
    let user1 = this.userMail;
    // let urlDelNotes = `${environment.endpoint}notes/id/delete?id=${id}`;
    for (let i = 0; i < this.notes1.length; i++) {
      if (this.notes1[i].id == id) {
        // this.notes[i].pin = false;
        this.fire.collection("user").doc(user1).collection("notes1").doc(id.toString()).delete();
        // this.http.delete(urlDelNotes).toPromise();
        this.fire.collection("user").doc(user1).collection("trashs").doc(id.toString()).set(this.notes1[i]);
        // this.http.post(environment.endpoint + "trashs/create", this.notes[i]).toPromise();
      }
    }
  }


  async addNoteToArchive(numb) {
    let id = numb;
    let user1 = this.userMail;
    let urlDelNotes = `${environment.endpoint}notes/id/delete?id=${id}&user1=${user1}`;
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id == id) {

        await this.http.post(environment.endpoint + "archives/create", this.notes[i]).toPromise();
        await this.http.delete(urlDelNotes).toPromise();
        this.openSnackBarArchive();
        // this.fire.collection("user").doc(user1).collection("notes").doc(id.toString()).delete();
        // this.fire.collection("user").doc(user1).collection("archives").doc(id.toString()).set(this.notes[i]);
        // this.notes[i].pin = false;


      }
    }
  }
  addNote1ToArchive(numb) {
    let id = numb;
    let user1 = this.userMail;
    // let urlDelNotes = `${environment.endpoint}notes/id/delete?id=${id}`;
    for (let i = 0; i < this.notes1.length; i++) {
      if (this.notes1[i].id == id) {
        this.fire.collection("user").doc(user1).collection("notes1").doc(id.toString()).delete();
        this.fire.collection("user").doc(user1).collection("archives").doc(id.toString()).set(this.notes1[i]);
        // this.notes[i].pin = false;
        // this.http.delete(urlDelNotes).toPromise();
        // this.http.post(environment.endpoint + "archives/create", this.notes[i]).toPromise();
      }
    }
  }

  public async addFlagToNote(id) {
    let user1 = this.userMail;
    let flag: any = this.flag;
    let urlDelFlags = `${environment.endpoint}flags/id/delete?id=${id}&user1=${user1}`;
    for (let i = 0; i < flag.length; i++) {
      if (flag[i].id == id) {

        await this.http.post(environment.endpoint + "notes/create", flag[i]).toPromise();
        await this.http.delete(urlDelFlags).toPromise();
        // this.fire.collection("user").doc(user1).collection("flags").doc(flag[i].id).delete();
        // this.fire.doc(`user/${user1}/notes/${id}`).set(flag[i]);
      }
    }
  }

  public async addNoteToFlag(id) {
    let user1 = this.userMail;
    let notes: any = this.notes;
    let urlDelNotes = `${environment.endpoint}notes/id/delete?id=${id}&user1=${user1}`;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id == id) {
        notes[i].pin = true;
        // console.log(notes[i])

        // this.fire.collection("user").doc(user1).collection("notes").doc(notes[i].id).delete();
        await this.http.post(environment.endpoint + "flags/create", notes[i]).toPromise();
        // this.fire.doc(`user/${user1}/flags/${id}`).set(notes[i]);
        await this.http.delete(urlDelNotes).toPromise();
      }
    }
  }
  public addNote1ToFlag(id) {
    let user1 = this.userMail;
    let notes1: any = this.notes1;
    for (let i = 0; i < notes1.length; i++) {
      if (notes1[i].id == id) {

        notes1[i].pin = true;
        notes1[i].notes = false;
        this.fire.collection("user").doc(user1).collection("notes1").doc(notes1[i].id).delete();
        this.fire.doc(`user/${user1}/flags/${id}`).set(notes1[i]);
      }
    }
  }

  async addFlagToArchive(numb) {
    let user1 = this.userMail;
    let id = numb;
    let urlDelFlags = `${environment.endpoint}flags/id/delete?id=${id}&user1=${user1}`;
    for (let i = 0; i < this.flag.length; i++) {
      if (this.flag[i].id == id) {
        // this.notes[i].pin = false;
        // this.http.delete(urlDelFlags).toPromise();
        // this.http.post(environment.endpoint + "archives/create", this.flag[i]).toPromise();
        // this.fire.collection("user").doc(user1).collection("flags").doc(id.toString()).delete();
        // this.fire.collection("user").doc(user1).collection("archives").doc(id.toString()).set(this.flag[i]);
        await this.http.post(environment.endpoint + "archives/create", this.flag[i]).toPromise();
        await this.http.delete(urlDelFlags).toPromise();
      }
    }
  }

  public async addFlagToTrash(numb) {
    let user1 = this.userMail;
    let id = numb;
    let urlDelFlags = `${environment.endpoint}flags/id/delete?id=${id}&user1=${user1}`;
    for (let i = 0; i < this.flag.length; i++) {
      if (this.flag[i].id == id) {
        // this.notes[i].pin = false;
        // this.http.delete(urlDelFlags).toPromise();
        // this.http.post(environment.endpoint + "trashs/create", this.flag[i]).toPromise();
        // this.fire.collection("user").doc(user1).collection("flags").doc(id.toString()).delete();
        // this.fire.collection("user").doc(user1).collection("trashs").doc(id.toString()).set(this.flag[i]);
        await this.http.post(environment.endpoint + "trashs/create", this.flag[i]).toPromise();
        await this.http.delete(urlDelFlags).toPromise();
        this.openSnackBarDel();
      }
    }
  }

  public async deleteArchiveToTrash(numb) {
    let id = numb;
    let user1 = this.userMail;
    let urlDelArchive = `${environment.endpoint}archives/id/delete?id=${id}&user1=${user1}`;
    for (let i = 0; i < this.archive.length; i++) {
      if (this.archive[i].id == id) {
        this.archive[i].arhieved = true;
        
        // this.notes[i].pin = false;
        // this.http.delete(urlDelArchive).toPromise();
        // this.http.post(environment.endpoint + "trashs/create", this.archive[i]).toPromise();
        // this.fire.collection("user").doc(user1).collection("archives").doc(id.toString()).delete();
        // this.fire.collection("user").doc(user1).collection("trashs").doc(id.toString()).set(this.archive[i]);
        await this.http.post(environment.endpoint + "trashs/create", this.archive[i]).toPromise();
        await this.http.delete(urlDelArchive).toPromise();
        this.openSnackBarDel();

      }
    }
  }
  public get getFlag(): Note[] {
    return this.flag;
  }
  public get getNotes(): Note[] {
    return this.notes;
  }
  public get getNotes1(): Note[] {
    return this.notes1;
  }
  public get getArchive(): Note[] {
    return this.archive;
  }
  public get getTrash(): Note[] {
    return this.trashs;
  }
  public getArchiveById(id) {
    for (let i = 0; i < this.archive.length; i++) {
      if (this.archive[i].id == id) {
        return this.archive[i];
      }
    }
  }


  public checkNotePageIsEmpty() {
    if (this.notes.length == 0 && this.flag.length == 0 && this.shared.length == 0 && this.filter.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  public checkArchivePageIsEmpty() {
    if (this.archive.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  public checkTrashsPageIsEmpty() {
    if (this.trashs.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  public getTrashsById(id) {
    for (let i = 0; i < this.trashs.length; i++) {
      if (this.trashs[i].id == id) {
        return this.trashs[i];
      }
    }
  }

  public async restoreNote(pin, archive, id, page) {
    let user = this.userMail;
    if (page == 'archive') {
      let archiveData = this.getArchiveById(id);
      if (pin == false) {
        let urlDelTrashs = `${environment.endpoint}archives/id/delete?id=${id}&user1=${user}`;
        await this.http.post(environment.endpoint + "notes/create", archiveData).toPromise();
        await this.http.delete(urlDelTrashs).toPromise();
        this.openSnackBarRestore();
        // this.fire.collection("user").doc(user).collection("notes").doc(id).set(archiveData);
        // this.fire.collection("user").doc(user).collection("archives").doc(id).delete();
        //restore archive to note
      } else if (pin == true) {
        let urlDelTrashs = `${environment.endpoint}archives/id/delete?id=${id}&user1=${user}`;
        await this.http.post(environment.endpoint + "flags/create", archiveData).toPromise();
        await this.http.delete(urlDelTrashs).toPromise();
        this.openSnackBarRestore();
        // this.fire.collection("user").doc(user).collection("flags").doc(id).set(archiveData);
        // this.fire.collection("user").doc(user).collection("archives").doc(id).delete();
        //restore archive to flag
      }
    } else {
      let trashsData = this.getTrashsById(id);
      if (archive == true) {
        let urlDelTrashs = `${environment.endpoint}trashs/id/delete?id=${id}&user1=${user}`;
        await this.http.post(environment.endpoint + "archives/create", trashsData).toPromise();
        await this.http.delete(urlDelTrashs).toPromise();
        this.openSnackBarRestore();
        // this.fire.collection("user").doc(user).collection("archives").doc(id).set(trashsData);
        // this.fire.collection("user").doc(user).collection("trashs").doc(id).delete();
        //restore trashs to archive
      } else if (pin == true && archive == false) {
        let urlDelTrashs = `${environment.endpoint}trashs/id/delete?id=${id}&user1=${user}`;
        await this.http.post(environment.endpoint + "flags/create", trashsData).toPromise();
        await this.http.delete(urlDelTrashs).toPromise();
        this.openSnackBarRestore();
        // this.fire.collection("user").doc(user).collection("flags").doc(id).set(trashsData);
        // this.fire.collection("user").doc(user).collection("trashs").doc(id).delete();
        //restore trashs to flag
      } else if (pin == false && archive == false) {
        let urlDelTrashs = `${environment.endpoint}trashs/id/delete?id=${id}&user1=${user}`;
        await this.http.post(environment.endpoint + "notes/create", trashsData).toPromise();
        await this.http.delete(urlDelTrashs).toPromise();
        this.openSnackBarRestore();
        // this.fire.collection("user").doc(user).collection("notes").doc(id).set(trashsData);
        // this.fire.collection("user").doc(user).collection("trashs").doc(id).delete();
        //restore trashs to note
      }
    }

  }

  public async changColor(color, id, page, shareTo) {

    let currentUser = this.userMail;
    let temp = {
      id: id,
      color: color,
      user: currentUser
    }
    if (shareTo == "") {
    } else {
      this.fire.collection("user").doc(shareTo).collection("sharedNote").doc(currentUser).collection("notes").doc(id).update({ color: color })
    }
    let user1 = this.userMail;
    switch (page) {
      case 'note': {
        let url = `${environment.endpoint}notes/id/update/color/`;
        await this.http.put(url, temp).toPromise();
        // this.fire.collection("user").doc(user1).collection("notes").doc(id.toString()).update({ color: color });
        break;
      }
      case 'flag': {
        let url = `${environment.endpoint}flags/id/update/color/`;
        await this.http.put(url, temp).toPromise();
        // this.fire.collection("user").doc(user1).collection("flags").doc(id.toString()).update({ color: color });
        break;
      }
      case 'archive': {
        let url = `${environment.endpoint}archives/id/update/color/`;
        // this.fire.collection("user").doc(user1).collection("archives").doc(id.toString()).update({ color: color });
        await this.http.put(url, temp).toPromise();
        break;
      }
      default:
        console.log("error!");
        break;
    }

  }

  public getColor(id) {
    return this.notes[id].color;
  }

  public getImg() {

    return this.img[0];
  }

  public async changeImg(id, page, img: string, pin) {

    let user1 = this.userMail;
    let temp = {
      id: id,
      img: img,
      pin: pin,
      user1:user1
    }
    if (page == 'archive') {
      let url = `${environment.endpoint}archives/id/update/img/`;
      await this.http.put(url, temp).toPromise();
      // this.fire.collection("user").doc(user1).collection("archives").doc(id.toString()).update({ imagePreview: img });

    } else if (page == 'note' && pin == false) {
      let url = `${environment.endpoint}notes/id/update/img`;
      await this.http.put(url, temp).toPromise();
      // this.fire.collection("user").doc(user1).collection("notes").doc(id.toString()).update({ imagePreview: img });

    } else if (page == 'note' && pin == true) {
      let url = `${environment.endpoint}flags/id/update/img`;
      await this.http.put(url, temp).toPromise();

      // this.fire.collection("user").doc(user1).collection("flags").doc(id.toString()).update({ imagePreview: img });
    }
  }

  public search(value) {
    this.filter = [];
    this.notes.filter((n) => {
      if (n.title.match(value)) {
        this.filter.push(n);
      }
    });
    this.flag.filter((n) => {
      if (n.title.match(value)) {
        this.filter.push(n);
      }
    });
    this.archive.filter((n) => {
      if (n.title.match(value)) {
        this.filter.push(n);
      }
    });
    this.trashs.filter((n) => {
      if (n.title.match(value)) {
        this.filter.push(n);
      }
    });
  }

  public getFilterById(id) {
    for (let i = 0; i < this.filter.length; i++) {
      if (this.filter[i].id == id)
        return this.filter[i].color;
    }
  }

  public deteleAllOnDays() {
    // let current = this.currentDate.getTime();
    // if (current == this.res) {
    //   let url = `${environment.endpoint}trash/delete/all`;
    //   this.http.delete(url).toPromise();
    // }
  }

  public async deleteAll() {
      let user = this.userMail;
      let urlDelTrashs = `${environment.endpoint}trashs/delete?user=${user}`;
      await this.http.delete(urlDelTrashs).toPromise();
  }

  public getColorById(id, page: string, notes) {
    switch (page) {
      case 'note': {
        for (let i = 0; i < this.notes.length; i++) {
          if (this.notes[i].id == id) {
            return this.notes[i].color;
          }
        }
        break;
      }
      case 'archive': {
        for (let i = 0; i < this.archive.length; i++) {
          if (this.archive[i].id == id) {
            return this.archive[i].color;
          }
        }
        break;
      }
      case 'flag': {
        for (let i = 0; i < this.flag.length; i++) {
          if (this.flag[i].id == id) {
            return this.flag[i].color;
          }
        }
        break;
      }
      case 'trash': {
        for (let i = 0; i < this.trashs.length; i++) {
          if (this.trashs[i].id == id) {
            return this.trashs[i].color;
          }
        }
        break;
      } case 'note1': {
        for (let i = 0; i < this.notes1.length; i++) {
          if (this.notes1[i].id == id) {
            return this.notes1[i].color;
          }
        }
        break;
      }
      default: {
        return console.log("can't get color")
        break;
      }
    }


  }
  public getColorByNumArchive(num: number, page: string) {
    if (page == 'archive') { return this.archive[num - 1].color; }
  }



}


@Component({
  selector: 'SnackBarDel',
  templateUrl: 'SnackBarDel.html',

})
export class SnackBarDel {
}

@Component({
  selector: 'SnackBarRestore',
  templateUrl: 'SnackBarRestore.html',

})
export class SnackBarRestore {
}

@Component({
  selector: 'SnackBarArchive',
  templateUrl: 'SnackBarArchive.html',

})
export class SnackBarArchive {
}