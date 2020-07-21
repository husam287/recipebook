import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map,tap, take, exhaustMap } from 'rxjs/operators';

import{ recipe } from '../recipes/recipe.model'
import { ingredient } from './ingredients.model';
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn:'root'})
export class RecipeService{
  recipeChanged=new Subject<recipe[]>();
  //  private recipes: recipe[]=[
  //       new recipe('hossam',
  //       'this is new dish',
  //       'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg',
  //       [new ingredient('pasta',10),new ingredient('tomato',2)])

  //       ,
        
  //       new recipe('Koshary',
  //       'Egyptian dish',
  //       'https://assets.cairo360.com/app/uploads/2011/10/article_original_2781_20111210_464116513-600x323.jpeg',
  //       [new ingredient('pasta',10),new ingredient('rooz',10)])
        
        
  //     ];
  private recipes:recipe[]=[];
constructor(private http:HttpClient,private authService:AuthService){}

      sentRecipesToServer(){
        this.http.put('https://recipebook-fe6b3.firebaseio.com/recipes.json',this.getRecipes())
        .subscribe(response=>{
          console.log(response);
        })
      }
      receiveRecipesFromServer(){      
      return this.http.get<recipe[]>('https://recipebook-fe6b3.firebaseio.com/recipes.json')   
          .pipe( 
          map(response=>{
              return response.map(recipe1=>{
               return {...recipe1 , ingredients: recipe1.ingredients? recipe1.ingredients :[]}
              })
            }),
          tap(response=>{this.setRecipes(response);})
              )  
      }



      setRecipes(recipes:recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice())
      }
      getRecipes(){
        return this.recipes.slice();
      }
      getRecipeById(id:number){
        return this.recipes[id];
      }
      addRecipe(newRecipe:recipe){
        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice());

      }
      updateRecipe(id:number,newRecipe:recipe){
        this.recipes[id]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }
      deleteRecipe(id:number){
        this.recipes.splice(id,1);
        this.recipeChanged.next(this.recipes.slice());
      }
}