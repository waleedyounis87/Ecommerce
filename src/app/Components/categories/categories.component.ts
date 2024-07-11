import { Component } from '@angular/core';
import { ICategory } from 'src/app/Interfaces/icategory';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
isLoading: boolean = true;
  constructor(private _CategoryService:CategoryService){}
  allCat:ICategory[] = []
  ngOnInit(): void {
    this._CategoryService.getBrands().subscribe({
      next: (categories) => {
        console.log('All brands:', categories);
        this.allCat = categories.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
}
}
