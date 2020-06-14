import { ingredient } from '../shared/ingredients.model';

export  class recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: ingredient[];

        constructor(name:string,des:string,image:string,ingredients:ingredient[]){
            this.name=name;
            this.description=des;
            this.imagePath=image;
            this.ingredients=ingredients;
        }
}