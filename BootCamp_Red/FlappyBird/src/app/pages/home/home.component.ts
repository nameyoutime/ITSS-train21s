import { Component, OnInit } from '@angular/core';
import { trigger} from '@angular/animations';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('animImageSlider', [
    ]),
  ]
})
export class HomeComponent implements OnInit {
  counter: number = 0;
  images = [
    '../../../assets/yellowbird-upflap.gif',
    '../../../assets/blue.gif',
    '../../../assets/red.gif',
    '../../../assets/pink.gif',
    '../../../assets/robot.gif',
    '../../../assets/3mau.gif'

  ];


  constructor() { }

  ngOnInit(): void {
  }
    onNext() {
      if (this.counter != this.images.length - 1) {
        this.counter++;
      }
    }

    onPrevious() {
      if (this.counter > 0) {
        this.counter--;
      }
    }

}
