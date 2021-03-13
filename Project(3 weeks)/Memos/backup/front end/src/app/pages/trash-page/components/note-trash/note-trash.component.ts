import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/models/note-model';
import { DialogData } from 'src/app/pages/note-page/components/note/note.component';
import { NoteService } from 'src/app/services/note.service';
import { TrashPageComponent } from '../../trash-page.component';


@Component({
  selector: 'app-note-trash',
  templateUrl: './note-trash.component.html',
  styleUrls: ['./note-trash.component.scss']
})
export class NoteTrashComponent implements OnInit {
  @Input() note: Note;
  menuActiveTrigger: boolean = false;

  constructor(public noteServcies: NoteService,public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  deleteNote(id) {
    const dialogRef = this.dialog.open(DialogTrashDialog, {
      width: 'auto',
      
      data: {id:id}
    });

  }
  changeNote(pin,archive,id){
    this.noteServcies.restoreNote(pin,archive,id,'trashs');
  }
  

}

@Component({
  selector: 'dialog-trash',
  templateUrl: 'dialog_trash.html',
})
export class DialogTrashDialog {
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<DialogTrashDialog>,public noteServcies: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,){

  }

  yes(data){
    this.noteServcies.deleteInTrash(data.id);
    this.dialog.closeAll();
  }
  no(){
    this.dialog.closeAll();
  }
}