import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' 
@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient) { }

  bankData(){
    return this.http.get("assets/config/json/bank.json");
  }

  create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  getBankServiceData(){
    var bank_data = JSON.parse(localStorage.getItem('bank_tally'));
    return bank_data;
  }
}
