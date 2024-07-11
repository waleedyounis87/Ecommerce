import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { count } from 'rxjs';
import { ICartProduct } from 'src/app/Interfaces/icart-product';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allProductsCart: ICartProduct[] = []
  totalPrice: number = 0
  statusApiUpdaed?: string
  statusApiDeleted?:string
  deletedItemName?:string
  statusApiDeletedAll?:string
  isLoading: boolean= true;
  constructor(private _CartService:CartService, private _ToastrService: ToastrService){}
  apiErrorMessage:string = ''
  cartId?:string
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (response) => {
        this.cartId = response.data._id
        console.log(response)
        this.totalPrice = response.data.totalCartPrice
        this.allProductsCart = response.data.products
        this.isLoading = false
      },
      error: (error) => {
        this.apiErrorMessage = "No Items On Cart"
        this.isLoading = false
      }
    })
  }
  updateCart(productID:string,count:number){
    
    if(count > 0){
      this.isLoading = true
      this._CartService.updateCart(productID,count).subscribe({
        next: (response) => {
          this._ToastrService.success("Successfully updated")
          console.log(response.status)
          this._CartService.totalPrice.next(response.data.totalCartPrice)
          this._CartService.count.next(response.numOfCartItems)
         
  
          this.totalPrice = response.data.totalCartPrice
          this.allProductsCart = response.data.products
          
          this.statusApiUpdaed = response.status
          this.isLoading = false
        },
        error: (error) => {
          this.apiErrorMessage = error.message
          this.isLoading = false
        }
      })
    }
  }
  deleteCartItem(id:string, deletedItemName:string){
    this.isLoading = true
    this._CartService.deleteCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success("Successfully Deleted")
        console.log(response)
        this._CartService.totalPrice.next(response.data.totalCartPrice)
        this._CartService.count.next(response.numOfCartItems)
        this.totalPrice = response.data.totalCartPrice
        this.allProductsCart = response.data.products
        this.statusApiDeleted = response.status
        this.deletedItemName = deletedItemName
        this.isLoading = false
      },
      error: (error) => {
        this.apiErrorMessage = error.message
        this.isLoading = false
      }
    })
  }
  deleteAllCartItems(){
    this.isLoading = true;
    this._CartService.deleteAllCart().subscribe({
      next: (response) => {
        this._ToastrService.success("All items Successfully Removed")
        console.log(response)
        this._CartService.totalPrice.next(0)
        this._CartService.count.next(0)
        this.totalPrice = 0
        
        this.allProductsCart = response.data
        console.log(this.allProductsCart)
        this.statusApiDeletedAll = response.message
        this.isLoading = false
      },
      error: (error) => {
        this.apiErrorMessage = error.message
        this.isLoading = false
      }
    })
  }

  
}
