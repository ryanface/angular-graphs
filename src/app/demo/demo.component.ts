import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import { AppData } from "../app.data";

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {

    public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "id";
    public sortOrder = "asc";

    public radarChartLabels:string[] = [];
    public radarChartData:any = [];
    public radarChartType:string = 'radar';

    constructor(private http: Http,  private AppData : AppData) {
    }

    public randomize():void {
      let tmp = this.AppData.get('bairro');
      this.radarChartData   = tmp[0].data;
      this.radarChartLabels = tmp[0].legend;
    }

    ngOnInit() {
      this.randomize();
      this.http.get("http://php-newtxt.rhcloud.com")
          .subscribe((data)=> {
              setTimeout(()=> {
                  this.data = data.json();
                  this.process();
              }, 1000);
          });
    }

    process(){
      console.log(this.data);
    }
    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
