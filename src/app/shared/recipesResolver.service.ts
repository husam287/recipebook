import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { recipe } from '../recipes/recipe.model';
import { RecipeService } from './recipes.service';

@Injectable({providedIn:'root'})
export class RecipesResolver implements Resolve<recipe[]>{

constructor(private recipeService:RecipeService){}

    resolve(activeRoute:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes=this.recipeService.getRecipes();
        if(recipes.length===0){
            return this.recipeService.receiveRecipesFromServer();

        }
        else{
            return recipes;
        }
    }
}