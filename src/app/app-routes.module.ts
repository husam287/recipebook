import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RecipesDetailsComponent } from './recipes/recipes-details/recipes-details.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolver } from './shared/recipesResolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRouting:Routes=[
    {path:'',redirectTo:'recipes',pathMatch:'full'},
    {path:'shop-list',component:ShoppingListComponent},
    {path:'recipes',component:RecipesComponent,
    canActivate:[AuthGuard],
    children:[  {path:'',component:RecipeStartComponent},
                {path:'new',component:RecipeEditComponent},
                {path:':id',component:RecipesDetailsComponent,resolve:[RecipesResolver]},
                {path:':id/edit',component:RecipeEditComponent,resolve:[RecipesResolver]}

     
                    
            ]      
    },
    {path:'auth',component:AuthComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(appRouting)],
    exports: [RouterModule]
})
export class appRoutes{

}