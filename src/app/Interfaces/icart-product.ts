import { IBrand } from "./ibrand";
import { ICategory } from "./icategory";
import { ISubcategory } from "./isubcategory";

export interface ICartProduct {

    count: number;
    price:number;
    product:{
        brand:IBrand;
        category:ICategory;
        id:string;
        imageCover:string;
        quantity:number;
        ratingsAverage:number
        subcategory:ISubcategory;
        _id:string;
        title:string;
    };
    totalCartPrice:number;

}
