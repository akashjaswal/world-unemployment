dataset = d3.csv("data/Economy_Parameters_clean.csv", function(dataset){

  var year = []
  var country = []
  var region = []
  var income_group = []
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
  console.log(region);
  console.log(country);
  console.log(income_group);

    var cl = document.getElementById("country-list");
    country.forEach(function(d){
      var option = document.createElement("option");
      option.text = d;
      cl.add(option);
    });
    $(".filter-country").chosen({width: "25%", placeholder_text_multiple: "Country"});
    $( ".filter-country" ).change(function() {
      var value = $('#country-list').val();
    });

    var rl = document.getElementById("region-list");
    region.forEach(function(d){
      var option = document.createElement("option");
      option.text = d;
      rl.add(option);
    });
    $(".filter-region").chosen({width: "25%", placeholder_text_multiple: "Regions"});
    $( ".filter-region" ).change(function() {
      var value = $('#region-list').val();
      console.log(value);
    });

 var ig = document.getElementById("ig-list");
    income_group.forEach(function(d){
      var option = document.createElement("option");
      option.text = d;
      ig.add(option);
    });
    $(".filter-ig").chosen({width: "25%", placeholder_text_multiple: "Income Group"});
    $( ".filter-ig" ).change(function() {
      var value = $('#ig-list').val();
      console.log(value);
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
      change: function(event, ui) {}
  });

pop = [];
dataset.forEach(function(d){ pop.push(parseInt(d.population)); });
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
      change: function(event, ui) {}
  });

 
  
  var margin = {top: 20, right: 20, bottom: 30, left: 50};
  var w = 960 - margin.left - margin.right;
  var h = 500 - margin.top - margin.bottom;

  var svg=d3.selectAll("chart")
                .append("svg")
                .attr("width",w)
                .attr("height",h)
                .append("g");


});


