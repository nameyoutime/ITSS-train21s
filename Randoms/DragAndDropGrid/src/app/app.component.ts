import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  components: Array<number>;
  dragItem: number;
  DragStarted(event: any, component: number): void {
    this.dragItem = component;
    console.log(event);
  }
  DragEnd(event, component: number) {
    this.dragItem = null;
  }
  Drop(event, component: number) {
    if (this.dragItem !== null) {
      const dragIndex = this.findDragIndex(this.dragItem);
      const dropIndex = this.findDropIndex(component);
      if (dragIndex !== dropIndex) {
        this.components = this.components.map(
          current => {
            if (current === this.components[dragIndex]) {
              return this.components[dropIndex];
            }
            if (current === this.components[dropIndex]) {
              return this.components[dragIndex];
            }
            return current;
          }
        );
        console.log(dragIndex,dropIndex);
      }
      // console.log(event);
    }
  }
  findDragIndex(component: number): number {
    let index = -1;
    for (let i = 0; i < this.components.length; i++) {
      if (component === this.components[i]) {
        index = i;
        break;
      }
    }
    return index;
  }
  findDropIndex(component: number): number {
    let index = -1;
    for (let i = 0; i < this.components.length; i++) {
      if (component === this.components[i]) {
        index = i;
        break;
      }
    }
    return index;
  }
  ngOnInit(): void {
    this.components = new Array<number>();
    for (let i = 0; i < 50; i++) {
      this.components.push(i);
    }
  }
}
