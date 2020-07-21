import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface authData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean

}


@Injectable({providedIn:'root'})
export class AuthService {
user=new BehaviorSubject<User>(null);
private expireTimer:any;

    constructor(private http:HttpClient,private router:Router){}

signup(email:string,password:string){
    return this.http.post<authData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8A_P2j6nioUsvjQHfk1lPyq-sJ1086zU',
    {   email:email,
        password:password,
        returnSecureToken:true
    
    }).pipe(
        catchError(this.handelErrors),
        tap(resData=>{
            this.handelAuth(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
        })
    )
}

login(email:string,password:string){
    return this.http.post<authData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8A_P2j6nioUsvjQHfk1lPyq-sJ1086zU',{
        email:email,
        password:password,
        returnSecureToken:true
    }).pipe(
        catchError(this.handelErrors),
        tap(resData=>{
            this.handelAuth(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
        })
    )

}

autoLogin(){
    const userData:
    {
        email:string,
        id:string,
        _token:string,
        _tokenExpireTime:string
    }
    =JSON.parse(localStorage.getItem('userData'));
    if(!userData){
        return;
    }

    const loadedUserData= new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpireTime))
    if(loadedUserData.token){
        this.user.next(loadedUserData);
        const timeToAutoLogout=new Date(userData._tokenExpireTime).getTime() - new Date().getTime();
        this.autoLogout(timeToAutoLogout);
    }
    
}



logout(){
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData');
    if(this.expireTimer){
        clearTimeout(this.expireTimer);
    }
    this.expireTimer=null;
}

autoLogout(expireTime:number){

this.expireTimer=setTimeout(() => {
        this.logout()
    }, expireTime);
}

private handelAuth(email:string,id:string,token:string,expireTime:number){
    const expireDate=new Date(new Date().getTime() + expireTime*1000)
    const user=new User(email,id,token,expireDate);
    this.user.next(user);
    this.autoLogout(expireTime*1000);
    localStorage.setItem('userData',JSON.stringify(user));

}


private handelErrors(errorRes:HttpErrorResponse){
    let errorMessage='An unknown error occurred!'
            if(!errorRes.error||!errorRes.error.error){
               return throwError(errorMessage)
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage='This Email is already exists'
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage='This Email you have entered is not exists'
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage='This password is incorrect'
            }
            return throwError(errorMessage);

}


}