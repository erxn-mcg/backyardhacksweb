function drawTreeMap() {
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;


      //json data
  var treeData =    [ {
      "name": "Life",
      "parent": "null",
      "img": "https://image.flaticon.com/icons/svg/124/124555.svg",
      "children": [
        {
          "name": "Environment",
          "parent": "Top Level",
          "img": "https://image.flaticon.com/icons/svg/616/616572.svg",
          "children": [
            {
              "name": "Food",
              "parent": "Level 2: A",
              "img": "https://cdn-icons-png.flaticon.com/128/706/706195.png"
            },
            {
              "name": "Sea Levels",
              "parent": "Level 2: A",
              "img": "https://cdn-icons-png.flaticon.com/128/4978/4978389.png"
            }
          ]
        },
        {
          "name": "Animals",
          "parent": "Top Level",
          "img": "https://image.flaticon.com/icons/svg/235/235376.svg",
          "children": [
            {
              "name": "Cattle",
              "parent": "Level 2: A",
              "img": "https://image.flaticon.com/icons/svg/591/591341.svg",
            },
            {
              "name": "Insects",
              "parent": "Level 2: A",
              "img": "https://image.flaticon.com/icons/svg/764/764017.svg",
            },
          ]
        },{
        "name": "People",
          "parent": "Top Level",
          "img": "https://cdn-icons-png.flaticon.com/128/599/599928.png",
          "children": [
            {
              "name": "Homes",
              "parent": "Level 2: A",
              "img": "https://cdn-icons-png.flaticon.com/128/609/609803.png",
            },
            {
              "name": "Businesses",
              "parent": "Level 2: A",
              "img": "https://cdn-icons-png.flaticon.com/128/3310/3310624.png",
            },
          ]
        }
      ]
    }
  ];

  var i = 0,
  	duration = 750,
  	root;

  var tree = d3.layout.tree()
  	.size([height, width]);

  var diagonal = d3.svg.diagonal()
  	.projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("#vis").append("svg")
    .attr("id", "treemap")
  	.attr("width", width + margin.right + margin.left)
  	.attr("height", height + margin.top + margin.bottom)
    .append("g")
  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;

  update(root);

  d3.select(self.frameElement).style("height", "500px");

  function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
  	  links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodes…
    var node = svg.selectAll("g.node")
  	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
  	  .attr("class", "node")
  	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
  	  .on("click", click);

    nodeEnter.append("circle")
  	  .attr("r", 1e-6)
  	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      var images = nodeEnter.append("svg:image")
        .attr("xlink:href",  function(d) { return d.img;})
        .attr("x", function(d) { return -25;})
        .attr("y", function(d) { return -25;})
        .attr("height", 50)
        .attr("width", 50)

    nodeEnter.append("text")
  	  //.attr("x", function(d) { return d.children || d._children ? -13 : 13; })
      .attr("dx", "3em")
      .attr("dy", ".3em")
  	  //.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      //.style("font-weight", function(d) { return d.name ? "bold" : ""; })
  	  .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
  	  .duration(duration)
  	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
  	  .attr("r", 10)
  	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text")
  	  .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
  	  .duration(duration)
  	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
  	  .remove();

    nodeExit.select("circle")
  	  .attr("r", 1e-6);

    nodeExit.select("text")
  	  .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
  	  .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
  	  .attr("class", "link")
  	  .attr("d", function(d) {
  		var o = {x: source.x0, y: source.y0};
  		return diagonal({source: o, target: o});
  	  });

    // Transition links to their new position.
    link.transition()
  	  .duration(duration)
  	  .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
  	  .duration(duration)
  	  .attr("d", function(d) {
  		var o = {x: source.x, y: source.y};
  		return diagonal({source: o, target: o});
  	  })
  	  .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
  	d.x0 = d.x;
  	d.y0 = d.y;
    });
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
  	d._children = d.children;
  	d.children = null;
    } else {
  	d.children = d._children;
  	d._children = null;
    }
    update(d);
  }
};
