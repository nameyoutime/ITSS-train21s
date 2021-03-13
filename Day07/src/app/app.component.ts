import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Demo01';
  
  public  count=0;
  
  public countChange(x){
    this.count=x;
  }
}
