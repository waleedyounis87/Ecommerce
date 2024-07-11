import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductsService } from 'src/app/Services/products.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
isLoading: boolean = true;
  page: number = 0;
  constructor(private _ProductService:ProductsService, private _WishlistService:WishlistService){}
  @Input() allProducts: IProduct[] = []
  wishlistProducts: IProduct[] = []
  @Input() arrOfIds: string[] = []
  inputValue: string = ''
  ngOnInit(): void {
    this._WishlistService.getwishlist().subscribe({
      next: (productsIDs) => {
        this.wishlistProducts = productsIDs.data;
        console.log(this.wishlistProducts)
        for (const item of this.wishlistProducts) {
         
          this.arrOfIds.push(item._id)
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
 
    })
   this._ProductService.getProducts().subscribe({
    next: (products) => {
      this.page = products.metadata.currentPage
      this.allProducts = products.data;
      console.log(this.allProducts)
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error:', error);
      this.isLoading = false;
    }
   })
  }

  nextpage() {
    if(this.page > 0 && this.page <= 2){
      this.isLoading = true
      this.callPagination(this.page + 1)
    }
    console.log(this.page)
  }
  prevpage(){
    this.isLoading = true
    if(this.page > 0 && this.page <= 2){
      this.callPagination(this.page - 1)
    }
  }
  callPagination(page: number){
    this._ProductService.getPage(page).subscribe({
      next: (products) => {
        console.log(products);
        this.allProducts = products.data;
        this.page = products.metadata.currentPage
        this.isLoading = false
        
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false
      }
    })
  }
}
