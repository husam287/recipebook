import { Component, OnInit, Input} from '@angular/core';
import { recipe } from '../../recipe.model';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-recipes-items',
  templateUrl: './recipes-items.component.html',
  styleUrls: ['./recipes-items.component.css']
})
export class RecipesItemsComponent implements OnInit {
  @Input() recipe:recipe;
  @Input() index:number;
  
  constructor(private activeRouter:ActivatedRoute,private router:Router ) { }

  ngOnInit(): void {
  }

  

}
