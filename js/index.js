$.when(
    $.getScript("js/treelayout.js"),
    $.getScript("js/d3-waffle.js"),
    $.getScript("js/linechart.js"),
    $.getScript("js/simulation.js"),
    $.getScript("js/treemap.js"),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){

  function chooseVis(section) {

    if (section == 0) {

			d3.select("#earth-things").remove();

			var svg = d3.select('#vis').append('svg')
				.attr("width", 600)
				.attr("height", 600)
				.attr("id", "bees")
				.append('svg:image')
				.attr({
				  'xlink:href': 'img/carbon.png',
				  x: 25,
				  y: 150,
				  width: 550,
					heigh: 500
				});

    } else if (section == 1) {

			d3.select("#bees").remove();
			d3.select("#waffle1").remove();
      earthlyBees()

    } else if (section == 2) {

			d3.select("#earth-things").remove();
			d3.select("#waffle2").remove();
      drawPesticides()

    } else if (section == 3){

			d3.select("#waffle1").remove();
			d3.select("#simulation").remove();
			pause = true;
      drawPesticidesUS()

    } else if (section == 4){

			d3.select("#waffle2").remove();
      startSim();

    } else if (section == 5){

			d3.select("#line-chart").remove();

    } else if (section == 6){
			d3.select("#ccd").remove();
			d3.select("#treemap").remove();
			d3.select("#simulation").remove();
			pause = true;
      drawLines()

    } else if (section == 7){

			d3.select("#line-chart").remove();
			d3.select("#question").remove();
      drawTreeMap()

    } else {
			d3.select("#treemap").remove();
			var svg = d3.select('#vis').append('svg')
				.attr("width", 600)
				.attr("height", 600)
				.attr("id", "question")
				.append('svg:image')
				.attr({
				  'xlink:href': 'img/question.png',
				  x: 100,
				  y: 50,
				  width: 400,
					heigh: 400
				});
		}
  }

  var update = function(value) {
    chooseVis(value);
  }
  // setup scroll functionality
  var scroll = scroller()
      .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // Pass the update function to the scroll object
  scroll.update(update)

});
