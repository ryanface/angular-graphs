function intervalTreeGroup(tree, firstDate, lastDate, experiments) {
    return {
        all: function() {
            var begin = d3.timeMonth(firstDate), end = d3.timeMonth(lastDate);
            var i = new Date(begin);
            var ret = [], count;
            do {
                next = new Date(i);
                var day = next.getDate();
                next.setDate(day+1)
                count = 0;
                tree.queryInterval(i.getTime(), next.getTime(), function() {
                   for(let j in experiments){
                      if(experiments[j].datatime >= i.getTime() && experiments[j].datatime <= next.getTime())
                        count += experiments[j].sum;
                   }
                });
                ret.push({key: i, value: count});
                i = next;
            }
            while(i.getTime() <= end.getTime());
            return ret;
        }
    };
}
function fix_item(source_group,leg) {
    return {
        all:function () {
            return source_group.all().filter(function(d) {
                //d.value = (d.value) ? d.value*100 : d.value ;
                console.log(leg,d.value)
                return d.value != 0;
            });
        }
    };
}
function remove_empty_bins(source_group) {
    return {
        all:function () {
            return source_group.all().filter(function(d) {
                return d.value != 0;
            });
        }
    };
}
/*
function intervalTreeGroup(tree, firstDate, lastDate) {
    return {
        all: function() {
            var begin = d3.timeMonth(firstDate), end = d3.timeMonth(lastDate);
            var i = new Date(begin);
            var ret = [], count;
            do {
                next = new Date(i);
                //------
                //------
                next.setMonth(next.getMonth()+1);
                count = 0;
                tree.queryInterval(i.getTime(), next.getTime(), function() {
                    ++count;
                });
                ret.push({key: i, value: count});
                i = next;
            }
            while(i.getTime() <= end.getTime());
            return ret;
        }
    };
}
var compositeTwo = dc.compositeChart(d3.select('#timeline'));
var dateDim = this.ndx.dimension(function(d) {return d.max;});
var hits = dateDim.group().reduceSum(dc.pluck('sum'));
compositeTwo
    .width(1000)
    .height(300)
    .x(d3.scaleTime())
    .y(d3.scaleLinear().domain([0,500]))
    .renderHorizontalGridLines(true)
    .xUnits(d3.timeMonths)
    .elasticX(true)
    .brushOn(true)
    .yAxisLabel("Número de Casos")
    .xAxisLabel("Meses")
    .compose([
      dc.lineChart(compositeTwo)
          .width(1000)
          .height(300)
          .ordinalColors(['red','green','blue','orange'])
          .renderLabel(true)
          .dimension(dateDim)
          .group(hits),
      dc.lineChart(compositeTwo)
          .width(1000)
          .height(300)
          .ordinalColors(['green','blue','orange'])
          .renderLabel(true)
          .dimension(dateDim)
          .group(hits)
    ])


var data = [
   {date: "12/27/2012", http_404: 2, http_200: 190, http_302: 100,total:0},
   {date: "12/28/2012", http_404: 2, http_200: 10, http_302: 100,total:0},
   {date: "12/29/2012", http_404: 1, http_200: 300, http_302: 200,total:0},
   {date: "12/30/2012", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "12/31/2012", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "01/01/2013", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "01/02/2013", http_404: 1, http_200: 10, http_302: 1,total:0},
   {date: "01/03/2013", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "01/04/2013", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "01/05/2013", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "01/06/2013", http_404: 2, http_200: 200, http_302: 1,total:0},
   {date: "01/07/2013", http_404: 1, http_200: 200, http_302: 100,total:0}
   ];
    var ndx = crossfilter(data);
    var parseDate = d3.timeParse("%m/%d/%Y");

    data.forEach(function(d) {
     d.date = parseDate(d.date);
     d.total= d.http_404+d.http_200+d.http_302;
    });
    console.log(data);

    var compositex = dc.compositeChart(d3.select('#barMulta'));
    var dateDim = ndx.dimension(function(d) {return d.date;});
    var hits = dateDim.group().reduceSum(dc.pluck('total'));
    var minDate = dateDim.bottom(1)[0].total;
    var maxDate = dateDim.top(1)[0].total;
    //console.log(minDate,maxDate);


    compositex
        .width(1000)
        .height(300)
        .x(d3.scaleTime())
        .y(d3.scaleLinear().domain([0,500]))
        .renderHorizontalGridLines(true)
        .xUnits(d3.timeMonths)
        .elasticX(true)
        .brushOn(true)
        .yAxisLabel("Número de Casos")
        .xAxisLabel("Meses")
        .compose([
          dc.lineChart(compositex)
              .width(1000)
              .height(300)
              .ordinalColors(['red','green','blue','orange'])
              .renderLabel(true)
              .dimension(dateDim)
              .group(hits),
          dc.lineChart(compositex)
              .width(1000)
              .height(300)
              .ordinalColors(['green','blue','orange'])
              .renderLabel(true)
              .dimension(dateDim)
              .group(hits)
        ])
*/
