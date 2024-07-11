import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private _AuthService: AuthService, private _Router:Router, private _ToastrService:ToastrService) { }
  isLoading = false;
  apiErrorMessage = ''
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required,Validators.email]),
    newPassword: new FormControl(null, [Validators.required,Validators.pattern('^[A-Z].{5,}')])
  })
  resetPasswordForm() {
    this.isLoading = true
    this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next: (response) => {
        console.log(response)
        this.isLoading = false
        this._Router.navigate(['/login'])
        this._ToastrService.success('Password reset successful. Enter New password.')
      },
      error: (error) => {
        this.isLoading = false
        this.apiErrorMessage = error.error.message
      }
    })
  }
}
