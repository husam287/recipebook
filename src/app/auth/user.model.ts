
export class User{
    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _tokenExpireTime:Date){}

    get token(){
        if(!this._token || new Date() >  this._tokenExpireTime)
            return null;
        return this._token;

    }
}

