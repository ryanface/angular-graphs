import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zing',
  templateUrl: './zing.component.html',
  styleUrls: ['./zing.component.css']
})
export class ZingComponent implements OnInit {

    type:string = 'line';
    data: any = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55, 40]
      }]
    };
    options: any = {
      responsive: true,
      maintainAspectRatio: false,
      showLines:true,
      spanGaps:false,
      elements: {
            line: {
                tension: 0, // disables bezier curves
            }
          }
    };

  constructor() { }

  ngOnInit() {
  }

}
