import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _Router:Router,private _ToastrService: ToastrService){

  }
  isLoading = false
  apiErrorMessage:string = ''
  loginForm: FormGroup = new  FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z].{5,}')])
  })
  loginFn(){
    this.isLoading = true
    this._AuthService.login(this.loginForm.value).subscribe({
      next: (respone) => {
        console.log(respone)
        this._Router.navigate(['/home'])
        localStorage.setItem('token',respone.token);
        this.isLoading = false
        this._AuthService.isLoggedIn.next(true)
        this._ToastrService.success('Logged in successfully')
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false
        this.apiErrorMessage = err.error.message
        this.isLoading = false
      }
    })
  }
 
}
