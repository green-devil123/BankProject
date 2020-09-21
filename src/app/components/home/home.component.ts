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

  constructor(public loginService:LoginService, private router: Router) { }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/']);
    return false;
  }
  
  ngOnInit(): void {
    this.userName =  this.loginService.getUserName();
  }

}
