import { Component, OnInit, Input } from '@angular/core';
import { recipe } from '../recipe.model';
import{ ShopListService } from '../../shared/shopList.service'
import { ingredient } from 'src/app/shared/ingredients.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipes.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css']
})
export class RecipesDetailsComponent implements OnInit {
recipe:recipe;
  constructor(private shop:ShopListService,
    private activeRouter:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(
      (params:Params)=>{
        this.recipe=this.recipeService.getRecipeById( +params['id']);
      }
    )
  }
  sendToShopList(arr:ingredient[]){
    this.shop.updateIngredient(arr);
  }
  deleteRecipe(){
    this.activeRouter.params.subscribe(
      (param:Params)=>{this.recipeService.deleteRecipe( +param['id'])}
    )
    this.router.navigate(['../'],{relativeTo:this.activeRouter})

  }

}
