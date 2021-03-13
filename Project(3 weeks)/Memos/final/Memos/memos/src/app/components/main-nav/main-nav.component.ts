import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { SharedService } from 'src/app/services/shared.service';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';



export interface DialogData {
  value: String;
}

export interface shareData {
  email: String;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private noteSer: NoteService,
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private shareSer: SharedService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    
  }
  value = 'Clear me';
  routeName: string = 'Memos';
  labels: string[];
  onEnter(value: string) {
    const dialogRef = this.dialog.open(ShareComponent, {
      width: 'auto',
      data: { value: value }
    });

  }
  onOpenShare() {
    const dialogRef = this.dialog.open(dialogInputshare, {
      width: 'auto'
    });

  }
  public noteShared: Array<any>;
  sharedNote() {

    this.noteShared = this.noteSer.getSharedNote;
    console.log(this.noteShared);
    // const dialogRef = this.dialog.open(, {
    //   width: '300px',height:'300px',
    //   data: this.noteShared
    // });

  }
  getSharedNote(email) {
    this.shareSer.addNoteShared(email);
  }
  public shared: Array<any>
  check() {
    this.shared = this.noteSer.getShared;


  }

  public getShared(email) {
    this.noteSer.activeShared(email);
  }
  public changeBack() {
    this.noteSer.changeBack();
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  ngOnInit(): void {
    
  }
  logout() {

    this.dialog.open(logout);


  }

}

@Component({
  selector: 'share',
  templateUrl: 'share.html',

})
export class ShareComponent {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ShareComponent>, public noteServcies: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public shareSer: SharedService) {
  }
  yes(value) {

    this.shareSer.checkEmail(value);
    this.dialog.closeAll();
  }
  no() {
    this.dialog.closeAll();
  }
}

@Component({
  selector: 'logout',
  templateUrl: 'logout.html',
})
export class logout {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<logout>, public auth: AuthService, private noteSer: NoteService,
  ) { }


  yes() {
    this.dialogRef.close();
    this.auth.signOut();
    this.noteSer.deleteUserMail();
  }
  no() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialogInputshare',
  templateUrl: 'dialogInputshare.html',
})
export class dialogInputshare {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<dialogInputshare>, public auth: AuthService, private noteSer: NoteService,
  ) { }

  onEnter(value: String) {
    const dialogRef = this.dialog.open(ShareComponent, {
      width: 'auto',
      data: { value: value }
    });
  }

}

@Component({
  selector: 'shareNoteDialog',
  templateUrl: 'shareNoteDialog.html',
})
export class shareNoteDialog {
  public noteShared:any;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<shareNoteDialog>, public auth: AuthService, private noteSer: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: shareData,
  ) {
    this.noteShared = data;
    console.log(this.noteShared)
  }
 


}