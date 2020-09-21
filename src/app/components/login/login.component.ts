import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: any;
  submitAttempt: Boolean = false;

  constructor(private loginService: LoginService,
    private router: Router,
    public formBuilder: FormBuilder,
    ) { 
      if(this.loginService.loggedIn()){
        this.router.navigate(['/home']);
      }
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.compose([  Validators.required]) ],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  loginUser(event){
    const self =this;
    this.submitAttempt = true;
    if(!this.loginForm.valid){
      console.log(this.loginForm.value);
    }
    else{
      this.loginService.loginData().subscribe(res=>{
        let data:any = res;
        function checkUser(user) {
          return self.loginForm.value && self.loginForm.value.userName === user.userName || self.loginForm.value.userName === user.email && self.loginForm.value.password === user.password;
        }
        if(data.User.some(checkUser)){
          var result = data.User.filter(obj => {
            return self.loginForm.value.userName === obj.userName || self.loginForm.value.userName === obj.email && self.loginForm.value.password === obj.password;
          })
          const user = {
            name: result[0].name,
            userName: result[0].userName,
            id: result[0].id,
            email: result[0].email
          };
          self.loginService.storeUserData(user);
          self.router.navigate(['/home']);
        } else{
            alert("User not found.");
        }
      },
      err => {
        console.log("error=>"+err);
      })
    }
  }

}
