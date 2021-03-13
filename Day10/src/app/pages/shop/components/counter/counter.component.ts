import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  constructor() { }

  
  public  count=0;
  public increase() {
    if (this.count == 10) {
      return;
    }
    this.count++;

  }

  public decrease() {
    if (this.count == 0) {
      return;
    }
    this.count--;

  }
  ngOnInit(): void {
  }

}
