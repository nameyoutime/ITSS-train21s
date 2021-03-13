import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/models/note-model';
import { NoteService } from 'src/app/services/note.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-note-shared',
  templateUrl: './note-shared.component.html',
  styleUrls: ['./note-shared.component.scss']
})
export class NoteSharedComponent implements OnInit {
  @Input() note: Note;
  menuActiveTrigger: boolean = false;
  fileProgress: boolean = false;
  @Input() details: boolean; // means that menu not in noteComponent
  @Input() newNote: boolean; // means that menu in newPageComponent
  selecetdFile: File;
  menuActive: boolean = false; // means that one of menu item open
  constructor(public noteServcies: NoteService,
    public dialog: MatDialog,public shareSer:SharedService) {
  }

  ngOnInit(): void {
  }
  upload(event: any, id,shareFrom,shareTo) {
    this.noteServcies.changeImgURLShared(event, id, shareFrom,shareTo);

  }
  colorClick(index: number,id,shareFrom,shareTo) {
    this.shareSer.
    changColorById(index,id,shareFrom,shareTo);
  }
  @Output() setMenu = new EventEmitter<boolean>();
  setMenuStatus(status: boolean) {
    this.setMenu.emit(status);
  }

  openDialogContent(noteData) {
    // console.log(noteData);
    const dialogRef = this.dialog.open(DialogContent, {
      width: 'auto',
      data: noteData
    });

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
    
    if (this.updateTitile != undefined && this.updateDescription == undefined) {
      
        this.noteSer.updateTitileShared(this.data.id, this.updateTitile, this.data.shareFrom,this.data.shareTo)
        this.dialogRef.close();
      
      
    } else if (this.updateDescription != undefined && this.updateTitile == undefined) {
      this.noteSer.updateDescriptionShared(this.data.id, this.updateDescription, this.data.shareFrom,this.data.shareTo)
      this.dialogRef.close();
    } else if (this.updateTitile == undefined && this.updateDescription == undefined) {
      this.dialogRef.close();
    } else {
      this.noteSer.updateBothShared(this.data.id, this.updateTitile, this.updateDescription, this.data.shareFrom,this.data.shareTo)
      this.dialogRef.close();
    }
  }

}
