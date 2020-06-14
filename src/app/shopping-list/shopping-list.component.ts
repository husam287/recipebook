import { Component, OnInit, OnDestroy } from '@angular/core';
import { ingredient } from '../shared/ingredients.model';
import {ShopListService } from '../shared/shopList.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:ingredient[];
  shopSubsc:Subscription;
  constructor(private shop:ShopListService) {
    
   }

  ngOnInit(): void {
    this.ingredients=this.shop.getList();
    this.shopSubsc= this.shop.added.subscribe(
      (arr:ingredient[])=>{this.ingredients=arr}
    )
  }
  ngOnDestroy(){
    this.shopSubsc.unsubscribe();
  }

  onEdit(index:number){
    this.shop.indexOfIngredient.next(index);
  }

}
