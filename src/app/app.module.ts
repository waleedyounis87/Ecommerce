import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { ProductsComponent } from './Components/products/products.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CartComponent } from './Components/cart/cart.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { VerifyPasswordComponent } from './Components/verify-code/verify-code.component';
import { ProductComponent } from './Components/product/product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { HomeMainSliderComponent } from './Components/home-main-slider/home-main-slider.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ShippingAddressComponent } from './Components/shipping-address/shipping-address.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonLoaderComponent } from './Components/skeleton-loader/skeleton-loader.component';
import { SearchPipe } from './Components/CustomPipes/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BrandsComponent,
    CategoriesComponent,
    ProductsComponent,
    FooterComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    VerifyPasswordComponent,
    ProductComponent,
    ProductDetailsComponent,
    HomeMainSliderComponent,
    WishlistComponent,
    ShippingAddressComponent,
    AllordersComponent,
    SkeletonLoaderComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      toastClass:'toast-top-center',
      tapToDismiss:true,
      closeButton: true,
      timeOut: 3000,
      progressBar: true,
      preventDuplicates: true,
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
