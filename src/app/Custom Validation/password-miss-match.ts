import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

export let passwordMisMatch = (regForm: AbstractControl): ValidationErrors | null =>{
    let {password,rePassword} = regForm.value
    if (password == rePassword){
        return null
    }
    else{
        return {passwordMissMatch: true}
    }
}
