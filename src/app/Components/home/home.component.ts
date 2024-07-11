import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductsService } from 'src/app/Services/products.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  
  
  constructor(private _ProductService:ProductsService, private _WishlistService:WishlistService){}
  @Input() allProducts: IProduct[] = []
  @Input() arrayOfIds: string[] = [];
  wishlistProducts: IProduct[] = [];
  isLoading: boolean = true
  page:number = 0;
  limit:number = 40
  ngOnInit(): void {
    this._WishlistService.getwishlist().subscribe({
      next: (productsIDs) => {
        this.wishlistProducts = productsIDs.data;
        console.log(this.wishlistProducts)
        for (const item of this.wishlistProducts) {
         
          this.arrayOfIds.push(item._id)
        }
        console.log(this.arrayOfIds)
        this.isLoading = false
        
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false
        
      }
 
    })
   this._ProductService.getProducts().subscribe({
    next: (products) => {
      console.log(products);
      this.page = products.metadata.currentPage
      this.allProducts = products.data;
      this.isLoading = false
    },
    error: (error) => {
     
      console.error('Error:', error);
      this.isLoading = false
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
