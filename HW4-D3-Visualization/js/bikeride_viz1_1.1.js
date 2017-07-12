//This version incorporates mouseover

var outerWidth = 500;
var outerHeight = 300;
var margin = { left: 110, top: 0, right: 15, bottom: 55 };
var barPadding = 0.2;
var barPaddingOuter = 0.1;

var xColumn = "Miles Ridden";
var yColumn = "Day of the Week";
var xAxisLabelText = "Miles Ridden";

// Vertical offset for x axis label
var xAxisLabelOffset = 50;

var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width",  outerWidth)
  .attr("height", outerHeight);
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var xAxisG = g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + innerHeight + ")")
var xAxisLabel = xAxisG.append("text")
  .style("text-anchor", "middle")
  .attr("x", innerWidth / 2)
  .attr("y", xAxisLabelOffset)
  .attr("class", "label")
  .text(xAxisLabelText);
var yAxisG = g.append("g")
  .attr("class", "y axis");

var xScale = d3.scale.linear().range([0, innerWidth]);
var yScale = d3.scale.ordinal().rangeRoundBands([0, innerHeight], barPadding, barPaddingOuter);

var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
  .ticks(5)
  .tickFormat(d3.format("s"))
  .outerTickSize(0);
var yAxis = d3.svg.axis().scale(yScale).orient("left")
  .outerTickSize(0);

var div = d3.select("body").append("div").attr("class", "toolTip");

function render_total(data){

	// NC edited
  xScale.domain([0, d3.max(data, function (d){ return d.miles; })]);
  yScale.domain(       data.map( function (d){ return d.day_of_week; }));

  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  var bars = g.selectAll("rect").data(data);
  
  bars.enter().append("rect")
    .attr("height", yScale.rangeBand());
  
  bars
    .attr("x", 0)
    .attr("y",     function (d){ return yScale(d.day_of_week); })
    .attr("width", function (d){ return xScale(d.miles); })
    //for mouseover to work, need to set fill attribute of the bars within the function that creates them and not in the css styles
    .attr("fill", "#9BB794")

  //Show miles on mouseover
  bars
    .on("mousemove", function(d){
        div.style("left", d3.event.pageX+10+"px");
        div.style("top", d3.event.pageY-25+"px");
        div.style("display", "inline-block");
        div.html((d.day_of_week)+"s<br>"+(d.miles)+ " miles");
    });

  bars
    .on("mouseout", function(d){
        div.style("display", "none");
    });

  bars.exit().remove();
  

  var commute_bars 

}

function render_commute(data){

  //Get the data again for commute

  d3.csv("data/Nick-Chen-BikeRides-Transformed.csv", function(error, data) {
        data.forEach(function(d) {
        d.commute_miles = +d.commute_miles;
      });

  // NC edited
  xScale.domain([0, d3.max(data, function (d){ return d.commute_miles; })]);
  yScale.domain(data.map( function (d){ return d.day_of_week; }));

  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  var bars = g.selectAll("rect").data(data);
  
  bars.enter().append("rect")
    .attr("height", yScale.rangeBand());
  
  bars
    .attr("x", 0)
    .attr("y",     function (d){ return yScale(d.day_of_week); })
    .attr("width", function (d){ return xScale(d.commute_miles); })
    //for mouseover to work, need to set fill attribute of the bars within the function that creates them and not in the css styles
    .attr("fill", "#80BBD9")

  //Show miles on mouseover
  bars
    .on("mousemove", function(d){
        div.style("left", d3.event.pageX+10+"px");
        div.style("top", d3.event.pageY-25+"px");
        div.style("display", "inline-block");
        div.html((d.day_of_week)+"s<br>"+(d.commute_miles)+ " miles");
    });

  bars
    .on("mouseout", function(d){
        div.style("display", "none");
    });

  bars.exit().remove();


});
}


function type(d){
  d.miles = +d.miles;
  d.commute_miles = +d.commute_miles
  return d;
}

d3.csv("data/Nick-Chen-BikeRides-Transformed.csv", type, render_total);
