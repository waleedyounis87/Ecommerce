import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passwordMisMatch } from 'src/app/Custom Validation/password-miss-match';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService,private _Router:Router, private _ToastrService:ToastrService) { }
  
  apiErrorMessage:string = ''
  isLoading:boolean = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.pattern('^[A-Z].{5,}')]),
    rePassword: new FormControl(null,[Validators.required, Validators.pattern('^[A-Z].{5,}')]),
    phone:new FormControl(null,[Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')])
  },{validators: passwordMisMatch});
  getFormData(){
    this.isLoading = true
    this._AuthService.register(this.registerForm.value).subscribe({
      next: (response) =>{
        console.log(response)
        this._ToastrService.success('Registration Successful')
        this._Router.navigate(['/login'])
        this.isLoading = false
      } ,
      error: (error) => {console.log(error)
        this.isLoading = false
        this.apiErrorMessage = error.error.message
      }
    })
  }
}
