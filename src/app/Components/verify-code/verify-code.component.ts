import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyPasswordComponent {
  constructor(private _AuthService:AuthService,private _Router:Router, private _ToastrService: ToastrService){}
  apiErrorMessage = ''
  isLoading = false
  verifyCode: FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required])
  })
  verifyCodeFn(){
    this.isLoading = true
    console.log(this.verifyCode.value)
    this._AuthService.verifyCode(this.verifyCode.value).subscribe({
      next:(response)=>{
        console.log(response)
        this.isLoading = false
        this._Router.navigate(['/reset-password'])
        this._ToastrService.success('Code Sent to your Account')
      },
      error:(error)=>{
        this.apiErrorMessage = error.error.message
        this.isLoading = false
      }
    })
  }
}
