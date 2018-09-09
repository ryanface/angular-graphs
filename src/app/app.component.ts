declare var io: any;
import { OnInit, OnDestroy,Component , Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  fullImagePath = './assets/img/indice.jpg';
  fullImagePath2 = './assets/img/chapebandeira.png';
  currentChoice: string = "home";

  constructor(private router: Router, private appService : AppService) {
    router.events.subscribe((url:any) => this.follow(url));
  }
  ngOnInit() {

  }
  ngOnDestroy() {

  }

  follow(url:any){
     if(url.shouldActivate){
        let tmp:string = url.url;
        let tmp1:string[] = tmp.split('/');
        this.setActive(tmp1[1]);
        //setTimeout(()=>this.setActive(tmp1[1]),500);
     }
  }

   setActive(choice: string): void{
       this.currentChoice = choice;
   }

   getActive(choice: string) : string{
       if(this.currentChoice == choice)
            return "active";
       else
            return "not";
   }
   checkLogin(){
      return this.appService.checkLogin();
   }
   checkAdmin(){
      return this.appService.checkAdmin();
   }
   logoff(){
     this.appService.logoff();
   }

}
