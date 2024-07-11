import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private _AuthService:AuthService, private _Router:Router) { }
  isLoading = false;
  apiErrorMessage = ''
  forgetForm: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
  })
  forgetPassword(){
    this.isLoading = true;
    this._AuthService.forgetpassowrd(this.forgetForm.value).subscribe({
      next: (respone) => {
        console.log(respone)
        this.isLoading = false;
        this._Router.navigate(['/verify-code']);
      },
      error: (error) => {
        this.isLoading = false;
        this.apiErrorMessage = error.error.message;
      }}
    )
  }
}
