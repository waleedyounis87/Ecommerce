import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from 'src/app/Interfaces/icategory';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-home-main-slider',
  templateUrl: './home-main-slider.component.html',
  styleUrls: ['./home-main-slider.component.css']
})
export class HomeMainSliderComponent implements OnInit {
  constructor(private _ProductsService:ProductsService){}
  
  allCat?:ICategory[]
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
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
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: false
  }
  ngOnInit(): void {
    this._ProductsService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.allCat = response.data;
      },
      error: (error) => console.log(error)
    })
  }
}
