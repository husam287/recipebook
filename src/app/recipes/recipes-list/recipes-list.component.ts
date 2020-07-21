import { Component, OnInit, OnDestroy,} from '@angular/core';
import{ recipe } from '../recipe.model';
import{ RecipeService } from '../../shared/recipes.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit,OnDestroy {
  recipes: recipe[];
  recSubs:Subscription;


    constructor(private recipeService:RecipeService) { }

    ngOnInit(){

      this.recSubs= this.recipeService.recipeChanged.subscribe(
        (rec:recipe[])=>{this.recipes=rec}
      )
    
    }
    ngOnDestroy(){
      this.recSubs.unsubscribe();
    }
   
}
