import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  constructor() { }

  @Input()
  public counter;

  @Output()
  public dataBind: EventEmitter<Number> = new EventEmitter();


  ngOnInit(): void {
  }
  
  public increase() {
    if (this.counter == 10) {
      return;
    }
    this.counter++;
    this.dataBind.emit(this.counter);
  }

  public decrease() {
    if (this.counter == 0) {
      return;
    }
    this.counter--;
    this.dataBind.emit(this.counter);

  }



}
