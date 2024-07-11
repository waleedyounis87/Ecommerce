import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(product:IProduct[],searchWord:string): IProduct[] {
    return product.filter(result=> result.title.toLowerCase().includes(searchWord.toLowerCase()));
  }

}
