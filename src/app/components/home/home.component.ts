import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName:string;
  airStatus:boolean = true;
  ifscStatus:boolean = false;
  constructor(public loginService:LoginService, private router: Router) { }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/']);
    return false;
  }

  route(str){
    if(str == 'air'){
      this.airStatus = true;
      this.ifscStatus = false;
    }else{
      this.airStatus = false;
      this.ifscStatus = true;
    }
  }
  
  ngOnInit(): void {
    this.userName =  this.loginService.getUserName();
  }

}
