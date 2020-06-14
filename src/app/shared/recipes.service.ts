import{ recipe } from '../recipes/recipe.model'
import { ingredient } from './ingredients.model';
import { Subject } from 'rxjs';
export class RecipeService{
  recipeChanged=new Subject<recipe[]>();
   private recipes: recipe[]=[
        new recipe('hossam',
        'this is new dish',
        'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg',
        [new ingredient('pasta',10),new ingredient('tomato',2)])

        ,
        
        new recipe('Koshary',
        'Egyptian dish',
        'https://assets.cairo360.com/app/uploads/2011/10/article_original_2781_20111210_464116513-600x323.jpeg',
        [new ingredient('pasta',10),new ingredient('rooz',10)])
        
        
      ];
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