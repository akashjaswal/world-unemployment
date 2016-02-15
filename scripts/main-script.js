//Importing Data

dataset = d3.csv("data/Economy_Parameters_clean.csv", function(dataset){

  var year = [];
  var country = [];
  var region = [];
  var income_group = [];

  dataset.forEach(function(d)
  {
    year.push(d.year);
    country.push(d.country);
    region.push(d.region);
    income_group.push(d.income_group);
  })

  year = _.uniq(year);
  country = _.uniq(country);
  region = _.uniq(region);
  income_group = _.uniq(income_group);

  makePlot(dataset);
  var filtered_data = dataset;

  var region_list = region;
  var countries = country;
  var income_group_list = income_group;
  var years = year;

    var cl = document.getElementById("country-list");
    country.forEach(function(d){
      var option = document.createElement("option");
      option.text = d;
      cl.add(option);
    });
    $(".filter-country").chosen({width: "25%", placeholder_text_multiple: "Country"});
    $( ".filter-country" ).change(function() {
      countries = $('#country-list').val();
      console.log(countries, region_list, income_group_list, years);
      if(countries == null)
      {
        countries = country;
        filtered_data = filterData(dataset, countries, region_list, income_group_list, years);
        makePlot(filtered_data);
        console.log(countries, region_list, income_group_list, years);
      }
      else
      {
      filtered_data = filterData(dataset, countries, region_list, income_group_list, years); 
      makePlot(filtered_data);
      console.log(countries, region_list, income_group_list, years);
    };
    });
    var rl = document.getElementById("region-list");
    region.forEach(function(d){
      var option = document.createElement("option");
      option.text = d;
      rl.add(option);
    });
    
    $(".filter-region").chosen({width: "25%", placeholder_text_multiple: "Regions"});

    $( ".filter-region" ).change(function() {
      region_list = $('#region-list').val();
      if(region_list == null)
      {
        region_list = region;
        filtered_data = filterData(dataset, countries, region_list, income_group_list, years); 
        makePlot(filtered_data);
      }
      else {
        filtered_data = filterData(dataset, countries, region_list, income_group_list, years); 
        makePlot(filtered_data);
      };
    });

    var ig = document.getElementById("ig-list");

    income_group.forEach(function(d){
      var option = document.createElement("option");
      option.text = d;
      ig.add(option);
    });

    $(".filter-ig").chosen({width: "25%", placeholder_text_multiple: "Income Group"});
    
    $( ".filter-ig" ).change(function() {
      income_group_list = $('#ig-list').val();
      if(income_group_list == null)
      {
        income_group_list = income_group;
        filtered_data = filterData(dataset, countries, region_list, income_group_list, years); 
        makePlot(filtered_data);
      }
      else
      {
      filtered_data = filterData(dataset, countries, region_list, income_group_list, years); 
      makePlot(filtered_data);
      console.log(filtered_data);
    };
    });

  var tooltip = $('<div id="tooltip" />').css({
    position: 'absolute',
    top: -25,
    left: -10
  }).hide();
  
  $( "#slider1" ).slider({
    min: 2010,
    max: 2014,
    values: [2010,2014],
    step: 1,
    range: true,
    start: function( event, ui ) {
        console.log(ui);
        $(ui.handle).find('.ui-slider-tooltip').show();
      },
      stop: function( event, ui ) {
        $(ui.handle).find('.ui-slider-tooltip').hide();
      },
      slide: function(event, ui) {
          $(ui.handle).find('.ui-slider-tooltip').text(ui.value);
      },
      create: function( event, ui ) {
        var tooltip = $('<div class="ui-slider-tooltip" />').css({
            position: 'absolute',
            top: -25,
            left: -10
        });
        
        $(event.target).find('.ui-slider-handle').append(tooltip);
      },
      change: function(event, ui) {
        start = ui.values[0];
        stop = ui.values[1];
        years = [];
        while(start <= stop){
          years.push(start.toString());
          start++;
        }
          filtered_data = filterData(dataset, countries, region_list, income_group_list, years);
          makePlot(filtered_data);
      }
  });

pop = [];
dataset.forEach(function(d){pop.push(parseInt(d.population)); });
var min_pop = _.min(pop);
var max_pop = _.max(pop);

$("#slider2" ).slider({
    min: min_pop,
    max: max_pop,
    step:1,
    values: [min_pop,max_pop],
    range: true,
    start: function( event, ui ) {
        console.log(ui);
        $(ui.handle).find('.ui-slider-tooltip').show();
      },
      stop: function( event, ui ) {
        $(ui.handle).find('.ui-slider-tooltip').hide();
      },
      slide: function(event, ui) {
          $(ui.handle).find('.ui-slider-tooltip').text(ui.value);
      },
      create: function( event, ui ) {
        var tooltip = $('<div class="ui-slider-tooltip" />').css({
            position: 'absolute',
            top: -25,
            left: -10
        });
        
        $(event.target).find('.ui-slider-handle').append(tooltip);
      },
      change: function(event, ui) {
        start = ui.values[0];
        stop = ui.values[1];
        var filtered_data = []
        filtered_data = filtered_data.concat(_.filter(dataset, function(d){return (d.population > start && d.population < stop); }));
        makePlot(filtered_data);
      }
    });

//----------------------------------------------------------


function filterData(dataset,countries, region_list, income_group_list, years)
{
  var filtered_data = [];
  filtered_data = filtered_data.concat(_.filter(dataset,function(d){
        if ($.inArray(d.country, countries) != -1 && $.inArray(d.region, region_list) != -1 
          && $.inArray(d.income_group, income_group_list) != 1 && $.inArray(d.year, years) != -1) {
          return true;
        };
      }));
  return filtered_data;
}

//----------------------------------------------------------

// Data Plotting 

function makePlot(dataset)

{

  d3.selectAll("svg").remove();

  var margin = {top: 20, right: 20, bottom: 30, left: 50};
  var w = 800 - margin.left - margin.right;
  var h = 400 - margin.top - margin.bottom;
  var padding = 20;

  var tooltip = d3.select('body').append('div')
            .style('position','absolute')
            .style('padding','10px 10px')
            .style('background','#ecf0f1')
            .style('opacity',0)


  var svg = d3.select("#chart").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.linear()
        .domain([0, 120])
        .range([padding, w-padding]);

  var y = d3.scale.linear()
        .domain([0, 50])
        .range([h-padding, padding]);

  var circles = svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
    .attr("cx", function(d) { return x(d.internet_users);  })
    .attr("cy", function(d) { return y(d.unemployment);  })
    .attr("r", 3)
    .style("stroke", "black")
     //.style("fill", function(d) { return colLightness(d.vol); })
    //.style("fill", function(d) { return col(d.type); })
    .style("fill","#2ecc71")
    .style("opacity", 0.4);


var xAxis = d3.svg.axis()
    .ticks(5)
    .scale(x);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis)
      .append("text")
      .attr("x", w)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Average Internet Users (Per 100 people)");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

svg.append("g")
   .attr("class", "axis")
   .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Average Unemployment Rate %");

$('svg circle').tipsy({ 
        gravity: 's', 
        html: true, 
        title: function() {
          var d = this.__data__;
        return "Country: " + d.country + "<br>" 
        + "Year: " + d.year + "<br>"
        + "Unemployment Rate: " + d.unemployment + "%" + "<br>"
        + "Average Internet Users: " + d.internet_users + "<br>"
        + "Total Population: " + d.population; 
        }
      });

};

x = function(d){ $.inArray(d.country, ["Argentina"]);
console.log("yes,",x)};

});


