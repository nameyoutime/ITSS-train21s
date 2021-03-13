import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/models/note-model';
import { NoteService } from 'src/app/services/note.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-note-flag',
  templateUrl: './note-flag.component.html',
  styleUrls: ['./note-flag.component.scss']
})
export class NoteFlagComponent implements OnInit {

  constructor(public noteServcies: NoteService, public dialog: MatDialog) { }
  @Input() note: Note;
  menuActiveTrigger: boolean = false;
  fileProgress: boolean = false;
  public color = this.noteServcies.colors;
  ngOnInit(): void {
  }
  public flagNote(id) {
    this.noteServcies.addFlagToNote(id);
  }
  public deleteNote(id) {
    this.noteServcies.addFlagToTrash(id);
  }
  public storeNote(id) {
    this.noteServcies.addFlagToArchive(id);
  }
  upload(event: any, id, pin) {
    this.noteServcies.changeImgURL(event, id, pin, "note");

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
  colorClick(index: number, numb: number, shareTo) {
    this.noteServcies.changColor(this.color[index], numb, 'flag', shareTo);
  }

  // getColor(index: number): string {
  //   return this.colors[index];
  // }
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
      this.noteSer.updateTitile(this.data.id, this.updateTitile, 'flags')
      this.dialogRef.close();
    } else if (this.updateDescription != undefined && this.updateTitile == undefined) {
      this.noteSer.updateDescription(this.data.id, this.updateDescription, 'flags')
      this.dialogRef.close();
    } else if (this.updateTitile == undefined && this.updateDescription == undefined) {
      this.dialogRef.close();
    } else {
      this.noteSer.updateBoth(this.data.id, this.updateTitile, this.updateDescription, 'flags')
      this.dialogRef.close();
    }
  }

}
