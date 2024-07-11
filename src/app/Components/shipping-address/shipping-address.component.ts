import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent {
    constructor(private x:CartService, private _ActivatedRoute:ActivatedRoute){}
    shippingAddressForm: FormGroup = new FormGroup({
      details:new FormControl(null,[Validators.required]),
      phone:new FormControl(null,[Validators.required]),
      city:new FormControl(null,[Validators.required]),
    })
    apiErrorMessage!: string;
    isLoading: boolean = false;
    id?:string | null
    payNow() {
      this.isLoading = true;
      this._ActivatedRoute.paramMap.subscribe(params => {
        this.id = params.get('id');
      })
      this.x.checkout(this.id!,this.shippingAddressForm.value).subscribe({
        next: (response) => {
          console.log(response);
          window.location.href = response.session.url;
          this.isLoading = false;
        },
        error: (error) => {
          this.apiErrorMessage = error.error.message;
          this.isLoading = false;
        }
      })
    }
}
