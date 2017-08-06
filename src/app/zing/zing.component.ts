import { Component, OnInit,  Input  } from '@angular/core';

@Component({
  selector: 'app-zing',
  templateUrl: './zing.component.html',
  styleUrls: ['./zing.component.css']
})
export class ZingComponent implements OnInit {

  public Color:any[]   = [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(54, 162, 235, 0.2)',
                   'rgba(255, 206, 86, 0.2)',
                   'rgba(75, 192, 192, 0.2)',
                   'rgba(153, 102, 255, 0.2)',
                   'rgba(255, 159, 64, 0.2)'];
   public data: any;

  @Input()
    Labels:any[] = ["10", "20"];
  @Input()
    Data:any[]   = [10,20];
    //line     : [{label: "First",data: [65, 59]},{label: "Two",data: [15, 29]}]
    //doughnut : [10,20]
  @Input()
    Options:any  = { responsive: true, elements: { line: {tension: 0 }  }};
  @Input()
    legenda:string = '*Legenda';
  @Input()
    type:string = 'doughnut';
  @Input()
    rows:string = '5';

   public options: any = this.Options;

  constructor() {

  }

  update(){
    if(this.type == 'line'){
        let tmp:any[]  = [];
        for(let i in this.Data){
           tmp.push({ backgroundColor:this.Color, label:this.Data[i].label, data:this.Data[i].data })
        }
        this.data = { labels: this.Labels, datasets: tmp, backgroundColor:this.Color  };
    }
    if(this.type == 'doughnut') this.data = { labels: this.Labels, datasets: [{backgroundColor:this.Color, data:this.Data}] };
  }

  ngOnInit() {
      setTimeout(()=>{    //<<<---    using ()=> syntax  setInterval(()=>{
          this.update();
     },2000);
  }

}
