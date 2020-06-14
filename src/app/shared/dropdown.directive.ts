import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
@HostBinding('class.btn-danger') clicked=false;
@HostListener('click') onclick(event :Event){
 this.clicked=!this.clicked;
}
  constructor() { }

}
