import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:any;
  constructor(private http:HttpClient) { }

  loginData(){
    return this.http.get("assets/config/json/user.json");
  }

  storeUserData(user) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.user= user;
  }

  loggedIn() {
    var user = localStorage.getItem('userData');
    if (user !== null) {
        return true;
    } else {
        return false;
    }
  }

  getUserName() {
    var user = JSON.parse(localStorage.getItem('userData'));
    return user.name;
  }

  logout() {
    this.user = null;
    localStorage.removeItem('userData');
    localStorage.removeItem('bank_tally');
  }
  
}
