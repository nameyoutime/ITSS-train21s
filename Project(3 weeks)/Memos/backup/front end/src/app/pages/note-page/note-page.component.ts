import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewChecked, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit, OnChanges {

  constructor(public noteServcies: NoteService,
    public sharedSer: SharedService,
    public authSer: AuthService,
    private _snackBar: MatSnackBar) { }

  checkArrayTest() {
    console.log(this.noteServcies.id)
  }
  check() {
    console.log(this.noteServcies.check())
  }



  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //   } else {
  //     this.noteServcies.tranferToNotes(event.previousContainer.data[event.previousIndex])
  //   }
  // }


  // components: Array<number>;
  // dragItem: number;
  // DragStarted(event: any, component: number): void {
  //   this.dragItem = component;
  //   // console.log(event);
  // }
  // DragEnd(event, component: number) {
  //   this.dragItem == null;
  // }
  // Drop(event, component: number) {
  //   if (this.dragItem !== null) {
  //     const dragIndex = this.findDragIndex(this.dragItem);
  //     const dropIndex = this.findDropIndex(component);
  //     if (dragIndex !== dropIndex) {
  //       this.components = this.components.map(
  //         current => {
  //           if (current === this.components[dragIndex]) {
  //             return this.components[dropIndex];
  //           }
  //           if (current === this.components[dropIndex]) {
  //             return this.components[dragIndex];
  //           }
  //           return current;
  //         }
  //       );
  //       console.log(dragIndex,dropIndex);
  //     }
  //     console.log(event);
  //   }
  // }
  // findDragIndex(component: number): number {
  //   let index = -1;
  //   for (let i = 0; i < this.components.length; i++) {
  //     if (component === this.components[i]) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   return index;
  // }
  // findDropIndex(component: number): number {
  //   let index = -1;
  //   for (let i = 0; i < this.components.length; i++) {
  //     if (component === this.components[i]) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   return index;
  // }
  ngOnChanges(): void {
    // 

  }
  ngOnInit(): void {
    this.noteServcies.getNotesData();
    this.noteServcies.getFlagsData();
    this.authSer.checkLogin();

    // this.components = new Array<number>();
    // for (let i = 0; i < 5; i++) {
    //   this.components.push(i);
    // }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarTestComponent, {
      duration: 1 * 1000,
      panelClass: ['white-snackbar']
    });
  }
}

@Component({
  selector: 'SnackBarTest',
  templateUrl: 'SnackBarTest.html',

})
export class SnackBarTestComponent {

  
}