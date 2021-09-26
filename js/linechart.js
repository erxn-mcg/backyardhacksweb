var dataset;
var showAlmond = false;
var showApple = false;
var showCoffee = false;
var almondPath;
var almondLength;
var applePath;
var appleLength;
var coffeePath;
var coffeeLength;
var x;
var y;

var width = 580;
var height = 550;

function drawLines() {

// SVG to work with
var svg = d3.select('#vis')
	.append('svg')
		.attr("width", 600)
		.attr("height", 600)
		.attr("id", "line-chart")
		margin = {top: 20, right: 20, bottom: 30, left: 0},
	 // width = +svg.attr("width") - margin.left - margin.right,
	 // height = +svg.attr("height") - margin.top - margin.bottom,
	 //width = width - margin.left - margin.right,
	// height = height - margin.top - margin.bottom,

	 g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var color = d3.scale.category10();


console.log(width);
console.log(height);

 x = d3.scale.linear()
	 .domain([1, 12])
	 .range([0, 580]);

 y = d3.scale.linear()
	 .domain([0, 100])
	 .range([550, 0]);


 d3.csv("bees2.csv", function(error, data) {
	data.forEach(function(d) {
		d.Year = +d.Year;
		d.Bees = +d.Bees;
		d.Almonds = +d.Almonds;
		d.Apple = +d.Apple;
		d.Coffee = +d.Coffee;

		dataset = data;
	});

	x.domain(d3.extent(dataset, function(d) { return d.Year; }));

var line = d3.svg.line()
		.interpolate("basis")
		.x(function(d) { return x(d.Year); })
		.y(function(d) { return y(d.Bees); })

	var path = g.append("path")
			.datum(dataset)
			.attr("fill", "none")
			.attr("stroke", "#F0E68C")
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 2)
			.attr("d", line)
			.attr("transform", "translate(10)")
			.attr("fill", "none")


	 var path2 = g.append("text")
			.datum(dataset)
			.html("&#x1F41D;")
			.attr("font-size", 25)
			.attr("transform", "translate(0)")
			.transition().duration(166.7)
			.attr("transform", "translate(48.3, 65)")
			.transition().duration(166.7)
			.attr("transform", "translate(96.6, 95)")
			.transition().duration(166.7)
			.attr("transform", "translate(144.9, 130)")
			.transition().duration(166.7)
			.attr("transform", "translate(193.2, 157)")
			.transition().duration(166.7)
			.attr("transform", "translate(241.5, 160)")
			.transition().duration(166.7)
			.attr("transform", "translate(289.8, 185)")
			.transition().duration(166.7)
			.attr("transform", "translate(338.1, 221)")
			.transition().duration(166.7)
			.attr("transform", "translate(386.4, 225)")
			.transition().duration(166.7)
			.attr("transform", "translate(434.7, 248)")
			.transition().duration(166.7)
			.attr("transform", "translate(483, 305)")
			.transition().duration(166.7)
			.attr("transform", "translate(531.3, 317)")
			.transition().duration(166.7)
			.attr("transform", "translate(580, 317)");


	var xAxis = d3.svg.axis().scale(x)
		 .orient("bottom").ticks(12);

	var yAxis = d3.svg.axis().scale(y)
			.orient("left").ticks(10);

	svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(10," + height + ")")
			.attr("stroke-width", .25)
			.call(xAxis);

		// Add the Y Axis
	svg.append("g")
			.attr("class", "y axis")
			.call(yAxis);

	svg.append("text")
	.attr("text-anchor", "middle")
	.attr("transform", "translate("+ (width/2 + 10) +","+(height + 35)+")")
	.text("Month");



	console.log(dataset);

	var totalLength = path.node().getTotalLength();

		path
			.attr("stroke-dasharray", totalLength + " " + totalLength)
			.attr("stroke-dashoffset", totalLength)
			.transition()
				.duration(2000)
				.ease("linear")
				.attr("stroke-dashoffset", 0);
});
}

function changeAlmond() {
	showAlmond = !showAlmond;
	if (showAlmond) {
		drawAlmonds();
	} else {
		almondPath
				.transition()
				.duration(1000)
				.ease("linear")
				.attr("stroke-dashoffset", almondLength);
	}
}

function changeApple() {
	showApple = !showApple;
	if (showApple) {
		drawApples();
	} else {
		applePath
				.transition()
				.duration(1000)
				.ease("linear")
				.attr("stroke-dashoffset", appleLength);
	}
}

function changeCoffee() {
	showCoffee = !showCoffee;
	if (showCoffee) {
		drawCoffee();
	} else {
		coffeePath
				.transition()
				.duration(1000)
				.ease("linear")
				.attr("stroke-dashoffset", coffeeLength);
	}
}

function drawAlmonds() {
		var line2 = d3.svg.line()
		.interpolate("basis")
		.x(function(d) { return x(d.Year); })
		.y(function(d) { return y(d.Almonds); });

		 almondPath = g.append("path")
			.datum(dataset)
			.attr("fill", "none")
			.attr("stroke", "rgb(000,255,000)")
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 2)
			.attr("d", line2)
			.attr("transform", "translate(10)")
			.attr("fill", "none")

		almondLength = almondPath.node().getTotalLength();

		almondPath
			.attr("stroke-dasharray", almondLength + " " + almondLength)
			.attr("stroke-dashoffset", almondLength)
			.transition()
				.duration(1000)
				.ease("linear")
				.attr("stroke-dashoffset", 0);

}

function drawApples() {
		var line2 = d3.svg.line()
		.interpolate("basis")
		.x(function(d) { return x(d.Year); })
		.y(function(d) { return y(d.Apple); });

		 applePath = g.append("path")
			.datum(dataset)
			.attr("fill", "none")
			.attr("stroke", "rgb(255,000,000)")
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 2)
			.attr("d", line2)
			.attr("transform", "translate(10)")
			.attr("fill", "none")

		appleLength = applePath.node().getTotalLength();

		applePath
			.attr("stroke-dasharray", appleLength + " " + appleLength)
			.attr("stroke-dashoffset", appleLength)
			.transition()
				.duration(1000)
				.ease("linear")
				.attr("stroke-dashoffset", 0);

}

function drawCoffee() {
		var line2 = d3.svg.line()
		.interpolate("basis")
		.x(function(d) { return x(d.Year); })
		.y(function(d) { return y(d.Coffee); });

		 coffeePath = g.append("path")
			.datum(dataset)
			.attr("fill", "none")
			.attr("stroke", "rgb(000,000,255)")
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 2)
			.attr("d", line2)
			.attr("transform", "translate(10)")
			.attr("fill", "none")

		coffeeLength = coffeePath.node().getTotalLength();

		coffeePath
			.attr("stroke-dasharray", coffeeLength + " " + coffeeLength)
			.attr("stroke-dashoffset", coffeeLength)
			.transition()
				.duration(1000)
				.ease("linear")
				.attr("stroke-dashoffset", 0);

}
