import { Component } from '@angular/core';

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

 setActive(choice: string): void{
     this.currentChoice = choice;
 }

 getActive(choice: string) : string{
     if(this.currentChoice == choice)
          return "active";
     else
          return "not";
 }

}
