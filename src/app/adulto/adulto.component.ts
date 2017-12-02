declare var d3: any;
declare var require: any;

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { AppService } from "../app.service";
import { GlobalDataService } from '../globaldata.service';

@Component({
  selector: 'app-adulto',
  templateUrl: './adulto.component.html',
  styleUrls: ['./adulto.component.css']
})
export class AdultoComponent implements OnInit {

  constructor(private AppService: AppService,
               private gd:GlobalDataService) { }

  private subscription: Subscription;

  ngOnInit() {
     this.subscription = this.AppService.goService().subscribe((lista: Response) => { this.callback(lista);  },(error) => console.log(error), );
     this.AppService.query({});
  }
  ngOnDestroy() {
      if(this.subscription)this.subscription.unsubscribe();
      this.AppService.goClear();
  }
  public go(){
     this.AppService.query({});
  }
  public callback(a:any){
    if(a){
        this.mount_three(a);
    }else{
       console.log('return null', a);
    }
  }
  public mount_three(a:any){
     let file:any = {};
     for(let i in a){
        if(file[a[i].tipo] == undefined) file[a[i].tipo] = [];
        if(file[a[i].tipo][a[i].NM_BAIRRO] == undefined) file[a[i].tipo][a[i].NM_BAIRRO] = [];

        file[a[i].tipo][a[i].NM_BAIRRO].push(a[i]);
     }
     console.log(file);
     this.mountMap(file);
  }
  public mountMap(data:any){
      var list ={ "name":"diet","children":[]};
      for(let i in data){
        let tmp = data[i];

        let sub = {"name":i,"children":[]};
        for(let j in tmp){
           sub.children.push({'name':j,"total":tmp[j].length});
        }
        list.children.push(sub);
      }
      this.treemap(list)
  }
  public treemap(data:any){
    var w = 1050,
        h = 620,
        x = d3.scale.linear().range([0, w]),
        y = d3.scale.linear().range([0, h]),
        color = d3.scale.category20c(),
        root,
        node;

    var treemap = d3.layout.treemap()
        .round(false)
        .size([w, h])
        .sticky(true)
        .value(function(d) { return d.total; });

    var svg = d3.select("#treemap").append("div")
        .attr("class", "chart")
        .style("width", w + "px")
        .style("height", h + "px")
      .append("svg:svg")
        .attr("width", w)
        .attr("height", h)
      .append("svg:g")
        .attr("transform", "translate(.5,.5)");

    //d3.json("/assets/flare.json", function(data) {
      node = root = data;
      var nodes = treemap.nodes(root)
          .filter(function(d) {return !d.children; });

      var cell = svg.selectAll("g")
          .data(nodes)
        .enter().append("svg:g")
          .attr("class", "cell")
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
          .on("click",(d) => { return d3.zoom(node == d.parent ? root : d.parent); });

      cell.append("svg:rect")
          .attr("width", function(d) { return d.dx - 1; })
          .attr("height", function(d) { return d.dy - 1; })
          .style("fill", function(d) {return color(d.parent.name); });

      cell.append("svg:text")
          .attr("x", function(d) { return d.dx / 2; })
          .attr("y", function(d) { return d.dy / 2; })
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")
          .text(function(d) { return d.name; })
          .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });
      //});

      d3.zoom = function(d) {
        var kx = w / d.dx, ky = h / d.dy;
        x.domain([d.x, d.x + d.dx]);
        y.domain([d.y, d.y + d.dy]);

        var t = svg.selectAll("g.cell").transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        t.select("rect")
            .attr("width", function(d) { return kx * d.dx - 1; })
            .attr("height", function(d) { return ky * d.dy - 1; })

        t.select("text")
            .attr("x", function(d) { return kx * d.dx / 2; })
            .attr("y", function(d) { return ky * d.dy / 2; })
            .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });

        node = d;
        d3.event.stopPropagation();
      }
  }

}
