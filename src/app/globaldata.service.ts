import { Injectable } from '@angular/core';

interface ShareObj {
  [id: string ]: any;

}

@Injectable()
export class GlobalDataService {
  obj: ShareObj = {};
  nav: any = {};

  public get(key:string):any{
       return (this.nav[key]) ? this.nav[key] : undefined;
  }
  public set(key:string,val:string):any{
       this.nav[key] = val;
       return this;
  }
  public choice(url:string,list:any):any{
       console.log('choice list:',list);
       this.nav.currentData = list;
       this.nav.currentClick = url;
       this.proccess();
  }
  public clear(){
       this.obj = {};
       this.nav = {};
  }
  public proccess(){
      console.log("Global",this.nav,this.obj);
  }
}
