import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService,authData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

    @Component({
        selector:'app-auth',
        templateUrl:'./auth.component.html',
    })

export class AuthComponent{
islogin=false;
isloading:boolean=false;
errorMessage:string=null;
    constructor(private authService:AuthService,private router:Router){}

onlogin(){
this.islogin=!this.islogin;
}

onSubmit(form:NgForm){
    this.isloading=true;
    let authObservable:Observable<authData>;
    if(this.islogin){
       authObservable= this.authService.login(form.value.email,form.value.password)
    }else{
        authObservable= this.authService.signup(form.value.email,form.value.password)
    }

    
    authObservable.subscribe(
        (authData)=>{
            console.log(authData)
            this.isloading=false;
            this.router.navigate(['/recipes'])
        },
        (error)=>{
            this.errorMessage=error
            this.isloading=false;
        }
        
    )    

    form.reset();
}
}