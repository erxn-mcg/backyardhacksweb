var w = 700,
h = w,
N = 20;

var alive = N*N;
var minSurvival = 300;

var yellow = d3.rgb(255,191,0),
    red = d3.rgb(200,100,100),
    clear = d3.rgb(255,255,255);
var grid = d3.layout.grid()
.nodeSize([h*0.8/(N*2), h*0.8/(N*2)])
.padding([h*0.8/(N*2), h*0.8/(N*2)]);

var force,root,svg,button;
var sick = 0.004;
var born = 0.0004;
var die = 0.01;
var nodes = [];
var pause = false;

d3.select("#pesticides-slider").on("input", function () {
		var p = this.value
		pause = false;
		if (p < 20) {
			document.getElementById("p-amount").innerHTML = "Very Low"
			sick = 0.0001
			born = 0.005;
		} else if (p < 40) {
			document.getElementById("p-amount").innerHTML = "Low"
			sick = 0.0005
			born = 0.005;
		} else if (p < 60) {
			document.getElementById("p-amount").innerHTML = "Medium"
			sick = 0.001
			born = 0.001;
		} else if (p < 80) {
			document.getElementById("p-amount").innerHTML = "High"
			sick = 0.005
			born = 0.0001;
		} else {
			document.getElementById("p-amount").innerHTML = "Very High"
			sick = 0.05
			born = 0.0001;
		}
		startSim();
});

d3.select("#playpause").on("click", function () {
		pause = !pause;
});

function startSim() {
		d3.select("#ccd").remove();
    pause = false;
    //resetGraph();

    d3.select("svg").remove();
    svg = d3.select("#vis").append("svg")
        .attr("id", "simulation")
        .attr("width", w)
        .attr("height", h);

    //create id
    var count = 0;

    nodes = d3.range(N*N).map(function() { return {id: count++, radius: h*0.8/(N*2), infected: false, dead:false}; });
        svg.selectAll("circle")
        .data(grid(nodes), function(d) {return d.id; })
        .enter().append("svg:circle")
        .attr("transform", function(d) {return "translate(" +(d.x+w/20) + "," + (d.y+h/20) + ")"; })
        .attr("r", function(d) { return d.radius; })
        .attr("id",function(d,i) {return 'individual-'+i;})
        .style("fill", function(d, i) {return yellow; });

    infected = function (i, N) {
      function getRandomArbitrary(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
      }

      return([getRandomArbitrary(0, 400)]);
    }

    setInterval(function () {

    if (!pause & alive > minSurvival) {
        for (i = 0; i < nodes.length; i++) {
						console.log(alive);
            if (nodes[i].dead == true) {
							console.log(nodes[i]);
							if (Math.random() < born) {
								nodes[i].dead = false;
								nodes[i].infected = false;
								alive++;
							}
            } else if (nodes[i].infected == false) {
                var colony = infected(i, N);
                for (var k = 0; k < colony.length; k++) {
                    if (Math.random() < sick & !nodes[colony[k]].dead) {
                        nodes[colony[k]].infected = true;
                    }
                }
						} else {
							if (Math.random() < die) {
									nodes[i].infected = false;
									nodes[i].dead = true;
									alive--;
							}
						}
        }
        svg.selectAll("circle").style("fill", function (d, i) {
            var col = yellow;
            if (nodes[i].infected & !nodes.dead) {
                col = red;
            } else if (nodes[i].dead) {
                col = clear;
            } else {
								col = yellow;
						}
            return col;
        });

    } else if (alive <= minSurvival) {
			d3.select("#simulation").transition().duration(1000).style("opacity", 0).remove().each("end", function () {
				d3.select('#vis').append('svg')
					.attr("width", 600)
					.attr("height", 600)
					.attr("id", "ccd")
					.append('svg:image')
					.attr({
					  'xlink:href': '../img/ccd.png',
					  x: 50,
					  y: 100,
					  width: 500
					}).transition().duration(200).style("opacity", 1)
			})
			alive = N*N;
		}
}, 120);
}
