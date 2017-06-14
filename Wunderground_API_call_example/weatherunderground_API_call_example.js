//=======================================================
//html code here:
//<script src="https://d3js.org/d3.v4.min.js"></script>
//<!-- build a table here using the javascript -->
//<div id="mytable"></div>
//=======================================================





//Here is my key, it has thresolds on the number of calls, so if you have issues try generating your own key https://www.wunderground.com/weather/api/
var key = "f727f29a02aab84c";

// API call using D3's .json, wrapper of XMLHttpRequest
var api_url = "https://api.wunderground.com/api/"+ key + "/forecast10day/q/CA/San_Francisco.json";
var x = d3.json(api_url,function(d) {
  //This worked
  //console.log(d);
  
  //Assigning d to a variable didn't work
  //forecast_data = d
  
  //This works
  //console.log(d.forecast.simpleforecast.forecastday[0].avehumidity)
   
  //This works
  //console.log(forecast_data)
  
  //This works to print the conditions of each forecast day onto the webpage
   d3.select("#mytable")
     .selectAll("p")
     .data(d.forecast.simpleforecast.forecastday)
     .enter()
     .append("p")
     .text(function (d) {
     console.log(d);
     return d.conditions; })
  
  
  
  });
  

  //d3.select("#mytable").append("p").text(x)
 //d3.select("#mytable").append("p").text("hello world!")
  
  
  
  //e.g. to acces particular parts of the forecast
  //console.log(d.forecast.simpleforecast)
  
  // NOTE: use the browser console rather than codepen's console
  // to see what's in the variable d
  
  // put d3 code here, in this callback...


// more notes:
// reference for d3.json:
// https://github.com/d3/d3-request/blob/master/README.md#json
// reference from reading on adding page elements with d3:
// http://chimera.labs.oreilly.com/books/1230000000345/ch05.html#_generating_page_elements










