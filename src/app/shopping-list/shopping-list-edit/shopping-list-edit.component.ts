import { Component, OnInit, ViewChild, EventEmitter, ElementRef, Output, OnDestroy } from '@angular/core';
import { ingredient } from 'src/app/shared/ingredients.model';
import { ShopListService } from '../../shared/shopList.service'
import { NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit,OnDestroy {
shopsubs:Subscription;
editedItem:ingredient;
editMode=false;
editedIndex:number;
@ViewChild('form') form:NgForm;
 

  constructor(private shopService:ShopListService) { }

  ngOnInit(): void {
    this.shopsubs=this.shopService.indexOfIngredient.subscribe(
      (index)=>{
        this.editedItem=this.shopService.getIngredient(index);
        this.editMode=true;
        this.editedIndex=index;
        this.form.setValue({
          nameInput:this.editedItem.name,
          amountInput:this.editedItem.amount
        })

      }
    )
  }
  ngOnDestroy(){
    this.shopsubs.unsubscribe();
  }

  

  deleteIng(){
   this.shopService.deleteItem(this.editedIndex);
   this.clear();

  }

  onSubmit(){
   
     let sentData=new ingredient(this.form.form.value.nameInput, Number(this.form.form.value.amountInput)) ;
    if(this.editMode){
      this.shopService.editIngredient(this.editedIndex,sentData);
    }
    else{
    this.shopService.addItem(sentData);
    }
    this.form.reset();
    this.editMode=false;

  }
clear(){
  this.form.reset();
  this.editMode=false;
}


}
