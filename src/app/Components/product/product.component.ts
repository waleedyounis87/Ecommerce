import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
isLoading: boolean = true;
  

  constructor(private _CartService:CartService,private _WishlistService:WishlistService, private _ToastrService: ToastrService) { } 
  @Input() product!: IProduct
  @Input() ids!: string[]
  added?:boolean
  addToCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.totalPrice.next(response.data.totalCartPrice)
        this._CartService.count.next(response.numOfCartItems)
        this._ToastrService.success('Product added to cart successfully!');
        console.log(response);
        
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this.isLoading = false
      }
    }
    )
  }
  addTowishlist(id: string) {
    this.added == true? this.added = false:this.added = true
    this._WishlistService.addtoWish(id).subscribe({
      next: (response) => {
        this.added = true;
        this.ids.push(id); 
        this._ToastrService.success('Product added to WishList successfully!');
        console.log(response);
      },
      error: (err) => {
        console.error('Error adding product to wishlist:', err);
      }
    })
  }
  deleteWish(id:string){
    this._WishlistService.deleteWish(id).subscribe({
      next: (response) => {
        this._ToastrService.success('Product deleted from Wishlist successfully!');
        this.added = false
        const index = this.ids.indexOf(id);
        if (index > -1) {
          this.ids.splice(index, 1); // Update ids array to reflect the removed product
        }
        console.log(response);
      },
      error: (err) => {
        console.error('Error deleting product from wishlist:', err);
      }
    })
  }
}
