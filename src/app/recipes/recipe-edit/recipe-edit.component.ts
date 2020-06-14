import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/recipes.service';
import { recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
id :number;
editMode=false;
recipeForm:FormGroup;



  constructor(
    private activeRouter:ActivatedRoute,
    private recipe:RecipeService,
    private router:Router) { }

  ngOnInit(): void {
    this.activeRouter.params
    .subscribe(
      (params:Params)=>{
        this.id= +params['id'];
        this.editMode= params['id'] !=null;
        this.formIntialize();
      }
    )

  }

  onSubmit(){
   const addedRecipe=new recipe(
    this.recipeForm.value['name'],
    this.recipeForm.value['description'],
    this.recipeForm.value['imageUrl'],
    this.recipeForm.value['ingredients']);
    if(this.editMode)
    {this.recipe.updateRecipe(this.id,addedRecipe);}
    else
    {this.recipe.addRecipe(addedRecipe);}
    this.router.navigate(['../'],{relativeTo:this.activeRouter})
    

  }


  private formIntialize(){
    let name ='';
    let imageUrl='';
    let description='';
    let ingrendients=new FormArray([]);
    
    
    if(this.editMode){
      let x=this.recipe.getRecipeById(this.id);
      name=x.name;
      imageUrl=x.imagePath;
      description=x.description;
      if(x['ingredients'])
      for(let ingr of x.ingredients ){
        ingrendients.push(
          new FormGroup(
            {
              'name':new FormControl(ingr.name,Validators.required),
              'amount':new FormControl(ingr.amount,[Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            }
          )
        )

      }
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(name,Validators.required),
      'imageUrl':new FormControl(imageUrl,Validators.required),
      'description':new FormControl(description,Validators.required),
      'ingredients': ingrendients
    })
  }

  addNewIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.activeRouter})

  }
  onDelete(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }







}
