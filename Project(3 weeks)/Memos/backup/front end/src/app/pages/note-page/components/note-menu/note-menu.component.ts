import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
} from "@angular/core";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { Note } from "../../../../models/note-model";
// import { DialogueConfirmComponent } from "../../components/dialogue-confirm/dialogue-confirm.component";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { NoteService } from "../../../../services/note.service";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from "@angular/fire/storage";
// import * as firebase from 'firebase/app';
import * as firebase from 'firebase';
import { AngularFireDatabase } from "@angular/fire/database"
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: "app-note-menu",
  templateUrl: "./note-menu.component.html",
  styleUrls: ["./note-menu.component.scss"],
})
export class NoteMenuComponent implements OnInit {
  @Input() note: Note;
  @Input() details: boolean; // means that menu not in noteComponent
  @Input() newNote: boolean; // means that menu in newPageComponent
  selecetdFile: File;
  menuActive: boolean = false; // means that one of menu item open

  constructor(
    private noteService: NoteService,
    public dialog: MatDialog,
    private http: HttpClient,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit() { }
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  // Trình xử lý sự kiện tải lên hình ảnh
  onFileUpload(event) {
    this.selecetdFile = event.target.files[0];
    let n = this.selecetdFile.name;
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, this.selecetdFile);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;

              const reader = new FileReader();
              reader.onload = () => {
                this.note.imagePreview = this.fb;
                // this.noteService.changeImg(this.note.id, "notes", this.note.imagePreview, this.note.pin);
              };
              let temp;
              temp = reader.readAsDataURL(this.selecetdFile);


            }
            // console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });

    

  }

  upload(event: any) {
    this.noteService.changeImgURL(event, this.note.id, this.note.pin, "note");

  }

  // // console.log(event);
  // this.selecetdFile = event.target.files[0];
  // console.log(this.selecetdFile);
  // this.uploadImage();
  // let storageRef = firebase.storage().ref
  // const task = storageRef.put(file);



  uploadImage() {
    // console.log(this.path);
    // this.fireStorage.upload('/files'+this.path,this.path);
    // this.http.
    // const fd = new FormData();
    // fd.append('image',this.selecetdFile,this.selecetdFile.name);
    // console.log(this.path);

  }

  // // Xuất ra sự kiện bắt đầu / kết thúc tải lên tệp
  // @Output() fileProgress = new EventEmitter<boolean>();
  // setFileProgress(show: boolean) {
  //   this.fileProgress.emit(show);
  // }
}