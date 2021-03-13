import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { InOutService } from 'src/app/services/in-out.service';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public inOut:InOutService) { }
  user: any;
  public inout= this.inOut;
  public aAuth = this.inOut.aAuth;
  ngOnInit(): void {
    this.aAuth.authState.subscribe((auth => {
      if (auth) {
        this.user = auth;
        console.log(this.user)
      }
    }));
    
  }
  
  

}
