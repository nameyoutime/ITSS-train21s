import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authSer:AuthService){};
  title = 'UI';
  public user;
  public temp :Observable<any>;
  public returnNav(){
    this.temp.subscribe((user)=>{
      user= this.authSer.openNav;
      console.log(user);
      return user;
    })
  }

 
}
