import { Component, OnInit} from '@angular/core';
import { RecipeService } from '../shared/recipes.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isauth:boolean=false;
userAuth:Subscription;
    constructor(private recipesService:RecipeService,private authService:AuthService) { }

    ngOnInit(): void {
     this.userAuth= this.authService.user.subscribe(
       (user)=>{
          this.isauth=!!user;
       }
     )
     }

    saveData(){
      this.recipesService.sentRecipesToServer();
    }
    fetchData(){
      this.recipesService.receiveRecipesFromServer().subscribe();
    }
    onLogout(){
      this.authService.logout();
    }

  }


