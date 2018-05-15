var full = function(){
  var chart2    = dc.rowChart("#test2");
  d3.csv("/assets/sifilis.csv").then(function(experiments) {
      //experiments = experiments.slice(0, 5);
      //console.log(experiments);
      var ndx = crossfilter(experiments);
      var chart2Dimension = ndx.dimension(function (d) {
          return d.CS_SEXO;
      });
      var chart2Group = chart2Dimension.group().reduceSum(function (d) {
          return d.NU_ANO;
      });
      chart2
          .width(500)
          .height(200)
          .dimension(chart2Dimension)
          .group(chart2Group);
          //.legend(dc.legend());
      console.log(chart2Group);
      dc.renderAll();
  });

}
