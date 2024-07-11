import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { ProductsComponent } from './Components/products/products.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CartComponent } from './Components/cart/cart.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { VerifyPasswordComponent } from './Components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { authGuard } from './Guards/auth.guard';
import { noAuthGuard } from './Guards/no-auth.guard';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ShippingAddressComponent } from './Components/shipping-address/shipping-address.component';
import { AllordersComponent } from './Components/allorders/allorders.component';

const routes: Routes = [
  {path:'',redirectTo: 'home',pathMatch: 'full'},
  {path: 'home',canActivate:[authGuard], component:HomeComponent},
  {path: 'brands',canActivate:[authGuard],component:BrandsComponent},
  {path: 'categories',canActivate:[authGuard],component:CategoriesComponent},
  {path: 'products',canActivate:[authGuard],component:ProductsComponent},
  {path: 'footer',canActivate:[authGuard],component:FooterComponent},
  {path: 'cart',canActivate:[authGuard],component:CartComponent},
  {path:'wishlist',canActivate:[authGuard],component:WishlistComponent},
  {path:'allorders',redirectTo: 'home',pathMatch:'full'},
  {path:'cart/shippingAddress/:id',canActivate:[authGuard],component:ShippingAddressComponent},
  {path: 'product/:id',component:ProductDetailsComponent},

  {path: 'register',canActivate:[noAuthGuard],component:RegisterComponent},
  {path: 'login',canActivate:[noAuthGuard],component:LoginComponent},
  {path: 'forget-password',canActivate:[noAuthGuard],component:ForgetPasswordComponent},
  {path: 'verify-code',canActivate:[noAuthGuard],component:VerifyPasswordComponent},
  {path: 'reset-password',canActivate:[noAuthGuard],component:ResetPasswordComponent},


  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
