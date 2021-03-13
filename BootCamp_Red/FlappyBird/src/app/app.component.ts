import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'Project';
 
  public userSignIn: any

  public signIn(user){
    this.userSignIn = user
  }
}

