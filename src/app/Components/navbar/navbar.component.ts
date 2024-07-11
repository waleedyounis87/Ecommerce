import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private _AuthService:AuthService, private _CartService: CartService){}
  isLoggedUser:boolean = false
  totalPrice:number = 0.00
  
  count:number = 0.00
  count2:number = 0.00
  
  logout(){
    this._AuthService.logout();
  }
  ngOnInit(): void {

    this._AuthService.isLoggedIn.subscribe(logged => this.isLoggedUser = logged);
    this._CartService.totalPrice.subscribe(price => this.totalPrice = price);
    this._CartService.count.subscribe(count => this.count = count);
    this._CartService.getCart().subscribe({
      next: (cart) => {
        this.totalPrice = cart.data.totalCartPrice;
        this.count = cart.numOfCartItems
      },
      error: (error) => console.error('Error retrieving cart:', error)
    })
  }
  
}
