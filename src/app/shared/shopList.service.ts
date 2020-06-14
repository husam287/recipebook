import { ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';


export class ShopListService{
    indexOfIngredient=new Subject<number>();

    added=new Subject<ingredient[]>();

    private ingredients :ingredient[] =[
        new ingredient('Tomato',20),
        new ingredient('potato',5),
      ];

      getIngredient(index:number){
        return this.ingredients[index];
      }


      addItem(ingData:ingredient){
        this.ingredients.push(ingData);
        this.added.next(this.ingredients.slice())
      }
      deleteItem(index:number){
        this.ingredients.splice(index,1);
        this.added.next(this.ingredients.slice())

        }
        getList(){
          return this.ingredients.slice();
        }

        updateIngredient(arr:ingredient[]){
          this.ingredients.push(...arr)
        }

        editIngredient(index:number,newIngredient:ingredient){
          this.ingredients[index]=newIngredient;
          this.added.next(this.ingredients.slice())
        }
}