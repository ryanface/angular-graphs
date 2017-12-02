declare var d3: any;
declare var require: any;

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { AppService } from "../app.service";
import { GlobalDataService } from '../globaldata.service';

var datad3 = require('./data');

@Component({
  selector: 'app-sun',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.css']
})
export class SunburstComponent implements OnInit {

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
    console.log('file',file);
     this.mountMap(file);
  }
  public mountMap(data:any){
      let list:any = {}, master:any = {};
      let sub:any = [];
      master = {name:'Master',children:[]};
      for(let i in data){
         list = {name:i,children:[]};
         sub = [];
         for(let j in data[i]){
             //console.log('i',i,'j',j, 'size',data[i][j].length);
             let tmp = {name:j,size:data[i][j].length};
             list.children.push(tmp);
         }
        master.children.push(list);
      }
      //master = datad3;
      console.log('master',master);
      this.sunmap(master)
  }
  public sunmap(data:any[]){
      var root = data;
      d3.param = {};
      //var root = datad3;
      var margin = {top: 350, right: 480, bottom: 350, left: 480},
          radius = Math.min(margin.top, margin.right, margin.bottom, margin.left) - 10;
      d3.filter_min_arc_size_text = function(d, i) {return (d.dx*d.depth*radius/3)>14};
      var hue = d3.scale.category10();
      var luminance = d3.scale.sqrt()
          .domain([0, 1e6])
          .clamp(true)
          .range([90, 20]);
      var svg = d3.select("#treemap").append("svg")
          .attr("width", margin.left + margin.right)
          .attr("height", margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var partition = d3.layout.partition()
          .sort(function(a, b) { return d3.ascending(a.name, b.name); })
          .size([2 * Math.PI, radius]);
      var arc = d3.svg.arc()
          .startAngle(function(d) { return d.x; })
          .endAngle(function(d) { return d.x + d.dx - .01 / (d.depth + .5); })
          .innerRadius(function(d) { return radius / 3 * d.depth; })
          .outerRadius(function(d) { return radius / 3 * (d.depth + 1) - 1; });
      //Tooltip description
      var tooltip = d3.select("#treemap")
          .append("div")
          .attr("id", "tooltip")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("opacity", 0);
      d3.format_number = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      d3.format_description = function(d) {
        var description = d.description;
            return  '<b>' + d.name + '</b>(' + d3.format_number(d.value) + ')';
      }
      d3.computeTextRotation = function(d) {
      	var angle=(d.x +d.dx/2)*180/Math.PI - 90
      	return angle;
      }
      d3.mouseOverArc = function(d) {
      			 d3.select(this).attr("stroke","black")
                tooltip.html(d3.format_description(d));
                return tooltip.transition()
                  .duration(50)
                  .style("opacity", 0.9);
              }
      d3.mouseOutArc = function(){
      	d3.select(this).attr("stroke","")
      	return tooltip.style("opacity", 0);
      }
      d3.mouseMoveArc = function (d) {
                return tooltip
                  .style("top", (d3.event.pageY-10)+"px")
                  .style("left", (d3.event.pageX+10)+"px");
      }
      d3.zoomIn = function (p) {
        if (p.depth > 1) p = p.parent;
        if (!p.children) return;
        d3.zoom(p, p);
      }
      d3.zoomOut = function (p) {
        if (!p.parent) return;
        d3.zoom(p.parent, p);
      }
      d3.key = function (d) {
        var k = [], p = d;
        while (p.depth) k.push(p.name), p = p.parent;
        return k.reverse().join(".");
      }
      d3.fill = function(d) {
       var p = d;
       while (p.depth > 1) p = p.parent;
       var c = d3.lab(hue(p.name));
       c.l = luminance(d.sum);
       return c;
     }
     d3.arcTween = function (b) {
       var i = d3.interpolate(this._current, b);
       this._current = i(0);
       return function(t) {
         return arc(i(t));
       };
     }
     d3.updateArc = function (d) {
       return {depth: d.depth, x: d.x, dx: d.dx};
     }
     d3.insideArc = function (d) {
        return d3.param.p.key > d.key
            ? {depth: d.depth - 1, x: 0, dx: 0} : d3.param.p.key < d.key
            ? {depth: d.depth - 1, x: 2 * Math.PI, dx: 0}
            : {depth: 0, x: 0, dx: 2 * Math.PI};
    }
    d3.outsideArc = function (d) {
        return {depth: d.depth + 1, x: d3.outsideAngle(d.x), dx: d3.outsideAngle(d.x + d.dx) - d3.outsideAngle(d.x)};
    }
    //d3.json("flare-labeled.json", function(error, root) {
    partition.value(function(d) { return d.size; })
          .nodes(root)
          .forEach(function(d) {
            d._children = d.children;
            d.sum = d.value;
            d.key = d3.key(d);
            d.fill = d3.fill(d);
          });
      partition.children(function(d, depth) { return depth < 2 ? d._children : null; })
          .value(function(d) { return d.sum; });
      var center = svg.append("circle")
          .attr("r", radius / 4)
          .on("click", d3.zoomOut);
      center.append("title")
          .text("zoom out");
      var partitioned_data=partition.nodes(root).slice(1)
      var path = svg.selectAll("path")
          .data(partitioned_data)
        .enter().append("path")
          .attr("d", arc)
          .style("fill", function(d) { return d.fill; })
          .each(function(d) { this._current = d3.updateArc(d); })
          .on("click", d3.zoomIn)
    		.on("mouseover", d3.mouseOverArc)
          .on("mousemove", d3.mouseMoveArc)
          .on("mouseout",d3.mouseOutArc);

      var texts = svg.selectAll("text")
          .data(partitioned_data)
        .enter().append("text")
    		.filter(d3.filter_min_arc_size_text)
        	.attr("transform", function(d) { return "rotate(" + d3.computeTextRotation(d) + ")"; })
    		.attr("x", function(d) { return radius / 3 * d.depth; })
    		.attr("dx", "6") // margin
          .attr("dy", ".35em") // vertical-align
    		.text(function(d,i) {return d.name})
      d3.zoom = function(root, p) {
                d3.param.p = p;
                d3.outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);
                center.datum(root);
                if (root === p) d3.enterArc = d3.outsideArc, d3.exitArc = d3.insideArc, d3.outsideAngle.range([p.x, p.x + p.dx]);
            	 var new_data=partition.nodes(root).slice(1)
                path = path.data(new_data, function(d) { return d.key; });
                if (root !== p) d3.enterArc = d3.insideArc, d3.exitArc = d3.outsideArc, d3.outsideAngle.range([p.x, p.x + p.dx]);
                d3.transition().duration(d3.event.altKey ? 7500 : 750).each(function() {
                  path.exit().transition()
                      .style("fill-opacity", function(d) { return d.depth === 1  ? 1 : 0; }) //+ (root === p)
                      .attrTween("d", function(d) { return d3.arcTween.call(this, d3.exitArc(d)); })
                      .remove();
                  path.enter().append("path")
                      .style("fill-opacity", function(d) { return d.depth === 2  ? 1 : 0; }) //- (root === p)
                      .style("fill", function(d) { return d.fill; })
                      .on("click", d3.zoomIn)
            			 .on("mouseover", d3.mouseOverArc)
                  	 .on("mousemove", d3.mouseMoveArc)
                  	 .on("mouseout", d3.mouseOutArc)
                      .each(function(d) { this._current = d3.enterArc(d); });
                  path.transition()
                      .style("fill-opacity", 1)
                      .attrTween("d", function(d) { return d3.arcTween.call(this, d3.updateArc(d)); });
                });
            	 texts = texts.data(new_data, function(d) { return d.key; })
            	 texts.exit().remove();
               texts.enter().append("text");
               texts.style("opacity", 0)
                  .attr("transform", function(d) { return "rotate(" + d3.computeTextRotation(d) + ")"; })
            		  .attr("x", function(d) { return radius / 3 * d.depth; })
            		  .attr("dx", "6") // margin
                  .attr("dy", ".35em") // vertical-align
                  .filter(d3.filter_min_arc_size_text)
                  .text(function(d,i) {return d.name})
            		    .transition().delay(750).style("opacity", 1)
         }
         d3.select(self.frameElement).style("height", margin.top + margin.bottom + "px");
  }
}
