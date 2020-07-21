import { Component, OnInit } from '@angular/core';
import {ShopListService } from './shared/shopList.service'
import { AuthService } from './auth/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ShopListService]

})
export class AppComponent implements OnInit {
  title = 'shop-app';
constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.autoLogin();
  }
  
}
