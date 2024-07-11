import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  getProducts():Observable<any>{
      return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  getProductByID(id:string):Observable<any>{
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getAllCategories():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  getPage(pg:number):Observable<any>{
     return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products`,{
      params:{page:pg}
     })
  }
} 
