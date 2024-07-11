import { Component, OnInit } from '@angular/core';
import { IBrand } from 'src/app/Interfaces/ibrand';
import { BrandService } from 'src/app/Services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit  {
isLoading: boolean = true;
  constructor(private _BrandService:BrandService){}
  allBrands:IBrand[] = []
  ngOnInit(): void {
    this._BrandService.getBrands().subscribe({
      next: (brands) => {
        console.log('All brands:', brands);
        this.allBrands = brands.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }
  
}
