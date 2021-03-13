import { Component, OnInit } from '@angular/core';
import { trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('animImageSlider', [
    ]),
  ]
})
export class MainComponent implements OnInit {

  counter: number = 0;
  // images = [
  //   '../../../assets/yellow.gif',
  //   '../../../assets/blue.gif',
  //   '../../../assets/red.gif',
  //   '../../../assets/pink.gif',
  //   '../../../assets/robot.gif',
  //   '../../../assets/3mau.gif'

  // ];

  images = []

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.images = this.dataService.images
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

  onNavigate(url){
    this.router.navigate([url])
    this.dataService.getBird(this.counter);
  }
}
