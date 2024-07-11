import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit  {

statusApiUpdaed!: string;
statusApiDeleted!: string;
apiErrorMessage!: string;
allProductsCart: IProduct[] = [];
ids: string[] = []
isLoading: boolean = true;
  constructor(private _WishlistService: WishlistService, private _CartService:CartService, private _ToastrService:ToastrService){}
  ngOnInit(): void {
      this. _WishlistService.getwishlist().subscribe({
        next: (response) => {
          console.log(response);
          this.allProductsCart = response.data
          console.log(this.allProductsCart)
          for (const item of this.allProductsCart) {
         
            this.ids.push(item._id)
          }
          this.isLoading = false
        },
        error: (error) => {
          this.isLoading = false
          console.error(error)
        }
      })
  }
  addToCart(id: string) {
    this.isLoading = true;
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success('Product added to cart successfully!');
        this._CartService.totalPrice.next(response.data.totalCartPrice)
        this._CartService.count.next(response.numOfCartItems)
        this.isLoading = false
        console.log(response);
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
      }
    }
    )
  }
  deleteWish(id:string){
    this.isLoading = true;
    this._WishlistService.deleteWish(id).subscribe({
      next: (response) => {
        this._ToastrService.success('Product deleted from Wishlist successfully!');
        this. _WishlistService.getwishlist().subscribe({
          next: (response) => {
            console.log(response);
            this.allProductsCart = response.data
           
  
          },
          error: (error) => {
            
            console.error(error)}
        })

        this.allProductsCart = response.data
        const index = this.ids.indexOf(id);
        if (index > -1) {
          this.ids.splice(index, 1); // Update ids array to reflect the removed product
        }
        console.log(response);
        this.isLoading = false
      },
      error: (err) => {
        console.error('Error deleting product from wishlist:', err);
        this.isLoading = false;
      }
    })
  }
  
}
