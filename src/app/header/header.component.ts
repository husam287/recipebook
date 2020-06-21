import { Component, OnInit} from '@angular/core';
import { RecipeService } from '../shared/recipes.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
    constructor(private recipesService:RecipeService) { }

    ngOnInit(): void { }

    saveData(){
      this.recipesService.sentRecipesToServer();
    }
    fetchData(){
      this.recipesService.receiveRecipesFromServer().subscribe();
    }

  }


