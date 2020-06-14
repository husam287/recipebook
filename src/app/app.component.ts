import { Component } from '@angular/core';
import {ShopListService } from './shared/shopList.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ShopListService]

})
export class AppComponent {
  title = 'shop-app';

  showComponet:string;

  recipesOrList(choise:string){
    this.showComponet=choise;
    
  }
}
