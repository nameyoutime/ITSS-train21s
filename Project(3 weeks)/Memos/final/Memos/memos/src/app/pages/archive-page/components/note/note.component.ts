import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/models/note-model';
import { NoteService } from 'src/app/services/note.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  constructor(public noteServcies: NoteService,public dialog: MatDialog) { }
  @Input() note: Note;
  menuActiveTrigger: boolean = false;
  fileProgress: boolean = false;
  @Input() details: boolean; // means that menu not in noteComponent
  @Input() newNote: boolean; // means that menu in newPageComponent
  selecetdFile: File;
  menuActive: boolean = false; // means that one of menu item open
  public color=this.noteServcies.colors;
  ngOnInit(): void {
  
  }
  // public flagNote(numb) {
  //   this.noteServcies.addFlagToNote(numb);
  // }
  public deleteNote(numb) {
    this.noteServcies.deleteArchiveToTrash(numb);
  }
  // public storeNote(numb) {
  //   this.noteServcies.addFlagToArchive(numb);
  // }
  
  changeNote(pin,archive,id){
    this.noteServcies.restoreNote(pin,archive,id,'archive');
  }
  openDialogContent(noteData) {
    // console.log(noteData);
    const dialogRef = this.dialog.open(DialogContent, {
      width: 'auto',
      data: noteData
    });

  }
    // Check current color is selected
    isSelect(index: number): boolean {
      return this.note.selectedColor == index;
    }
    // Color menu item click event handler
    colorClick(index: number,numb:number,shareTo) {
      // this.noteServcies.changColor(this.color[index],numb,'archive');
      // console.log(this.color[index])
      // console.log(shareTo);
      this.noteServcies.changColor(this.color[index],numb,'archive',shareTo)
    }
    upload(event: any,id,pin) {
      this.noteServcies.changeImgURL(event,id,pin,"archive");
      
    }
  
  

    // Outputing menu opened trigger
    @Output() setMenu = new EventEmitter<boolean>();
    setMenuStatus(status: boolean) {
      this.setMenu.emit(status);
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
      this.noteSer.updateTitile(this.data.id, this.updateTitile, 'archives')
      this.dialogRef.close();
    } else if (this.updateDescription != undefined && this.updateTitile == undefined) {
      this.noteSer.updateDescription(this.data.id, this.updateDescription, 'archives')
      this.dialogRef.close();
    } else if (this.updateTitile == undefined && this.updateDescription == undefined) {
      this.dialogRef.close();
    } else {
      this.noteSer.updateBoth(this.data.id, this.updateTitile, this.updateDescription, 'archives')
      this.dialogRef.close();
    }
  }

}

