import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

import { Note } from 'src/app/models/note-model';
import { NoteService } from 'src/app/services/note.service';
import { EditNoteModalComponent } from './edit-note-modal/edit-note-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent implements OnInit {

  @Input() note: Note;
  menuActiveTrigger: boolean = false;
  fileProgress: boolean = false;
  @Input() details: boolean; // means that menu not in noteComponent
  @Input() newNote: boolean; // means that menu in newPageComponent
  selecetdFile: File;
  menuActive: boolean = false; // means that one of menu item open

  openDialog(id): void {
    const dialogRef = this.dialog.open(DialogNote, {
      width: 'auto',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');

    });
  }
  openDialogContent(noteData) {
    // console.log(noteData);
    const dialogRef = this.dialog.open(DialogContent, {
      width: 'auto',
      data: noteData
    });

  }

  public color = this.noteServcies.colors;

  addToShare(id, shareTo) {
    this.shareSer.checkEmailShared(id, shareTo);
  }
  onEnter(value: string) {
    // this.shareSer.checkEmail(value);
    // console.log("test");
  }

  constructor(public noteServcies: NoteService,
    public dialog: MatDialog, public shareSer: SharedService) {
  }

  ngOnInit(): void {
  }
  public deleteNote(id, shareTo) {
    this.noteServcies.addToTrash(id, shareTo);
  }

  public storeNote(id) {
    this.noteServcies.addNoteToArchive(id);
  }

  public noteFlag(id) {
    this.noteServcies.addNoteToFlag(id);
  }


  // Check current color is selected
  isSelect(index: number): boolean {
    return this.note.selectedColor == index;
  }
  // Color menu item click event handler
  colorClick(index: number, numb: number, shareTo) {
    // console.log(shareTo)
    this.noteServcies.changColor(this.color[index], numb, 'note', shareTo);
  }
  setFileProgress(fileProgress: boolean) {
    this.fileProgress = fileProgress;
  }
  // Open modal note edit

  upload(event: any, id, pin,shareFrom,shareTo) {
    if(shareTo==""){
      this.noteServcies.changeImgURL(event, id, pin, "note");
    }else{
      this.noteServcies.changeImgURLShared(event,id,shareFrom,shareTo)
    }
    

  }

  check() {
    console.log("testing");
  }
  // Outputing menu opened trigger
  @Output() setMenu = new EventEmitter<boolean>();
  setMenuStatus(status: boolean) {
    this.setMenu.emit(status);
  }
}


@Component({
  selector: 'dialog-note',
  templateUrl: './dialog-note.html',
})


export class DialogNote {
  @Input() note: Note;
  constructor(
    public dialogRef: MatDialogRef<DialogNote>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public shareSer: SharedService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  addToShare(data, shareTo) {
    this.shareSer.checkEmailShared(data.id, shareTo);
    // this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.html',
})


export class DialogContent {
  public title: string = this.data.title;
  public description = this.data.description;
  constructor(public noteSer: NoteService
    , public dialogRef: MatDialogRef<DialogContent>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    public shareSer: SharedService) {
    // console.log(data.description);
  }
  public updateTitile;
  changeTitle(value: string) {
    this.updateTitile = value
  }
  public updateDescription;
  changeDescription(value: string) {
    this.updateDescription = value;
  }
  UpdateContent() {
    if (this.updateTitile != undefined &&this.updateDescription==undefined) {
      if(this.data.shareTo==""){
        this.noteSer.updateTitile(this.data.id, this.updateTitile, 'notes')
        this.dialogRef.close();
      }else{
        // console.log(this.data.shareTo)
        this.noteSer.updateTitileShared(this.data.id,this.updateTitile,this.data.shareFrom,this.data.shareTo)
        this.dialogRef.close();
      }
      
    } else if (this.updateDescription != undefined &&this.updateTitile==undefined) {
      // console.log("update descript")
      if(this.data.shareTo==""){
        this.noteSer.updateDescription(this.data.id, this.updateDescription, 'notes')
        this.dialogRef.close();
      }else{
        this.noteSer.updateDescriptionShared(this.data.id,this.updateDescription,this.data.shareFrom,this.data.shareTo)
        this.dialogRef.close();
      }
      
    } else if (this.updateTitile == undefined && this.updateDescription == undefined) {
      this.dialogRef.close();
    } else{
      // console.log('update both');
      if(this.data.shareTo==""){
        this.noteSer.updateBoth(this.data.id, this.updateTitile, this.updateDescription, 'notes')
        this.dialogRef.close();
      }else{
        this.noteSer.updateBothShared(this.data.id, this.updateTitile, this.updateDescription, this.data.shareFrom,this.data.shareTo)
        this.dialogRef.close();
      }
      
    }
  }

  check(){
    console.log(this.updateTitile,this.updateDescription)
  }
}