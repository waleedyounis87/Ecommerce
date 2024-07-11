import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _Httpclient:HttpClient) { }
  getBrands(): Observable<any>{
    return this._Httpclient.get('https://ecommerce.routemisr.com/api/v1/brands',{
      params:{
        limit: 10
      }
    });
  }
}
