// SVG to work with
function drawPesticides() {
  var data2 = [
    { "name": "Human Produced Carbon (Global)", "value": 1},
    { "name": "Naturally Produced Carbon (Global)", "value": 99}
  ]

  /* to color elements we use the class name ( slugigy(name) ) */
  var domain = data2.map(function(d){ return slugify(d.name); })
  var range = ["#708090", "#fff", "#a0d0de", "#97b5cf"]
  var palette = d3.scale.ordinal().domain(domain).range(range);

  var chart4 = d3waffle("&#11042")
                  .rows(10)
                  .colorscale(palette)
                  .appearancetimes(function(d, i){ return i*10 + Math.random()*250;})
                  .height(600);

  d3.select("#vis").append("svg")
    .attr("width", 600)
    .attr("height", 600)
    .attr("id", "waffle1")
    .datum(data2)
    .call(chart4)
    .attr("stroke", "#708090");
}

function drawPesticidesUS() {
  var data2 = [
    { "name": "Carbon in Total Human Emissions", "value": 80},
    { "name": "Other in Total Human Emissions", "value": 20}
  ]

  /* to color elements we use the class name ( slugigy(name) ) */
  var domain = data2.map(function(d){ return slugify(d.name); })
  var range = ["#B22222", "#fff", "#a0d0de", "#97b5cf"]
  var palette = d3.scale.ordinal().domain(domain).range(range);

  var chart4 = d3waffle("&#11042")
                  .rows(10)
                  .colorscale(palette)
                  .appearancetimes(function(d, i){ return i*10 + Math.random()*250;})
                  .height(600);

  d3.select("#vis").append("svg")
    .attr("width", 600)
    .attr("height", 600)
    .attr("id", "waffle2")
    .datum(data2)
    .call(chart4)
    .attr("stroke", "#B22222");
}

function drawBees() {
  var data2 = [
    { "name": "Clean Honey", "value": 25},
    { "name": "Infected Honey", "value": 75}
  ]

  /* to color elements we use the class name ( slugigy(name) ) */
  var domain = data2.map(function(d){ return slugify(d.name); })
  var range = ["#cc0000", "#fff", "#a0d0de", "#97b5cf"]
  var palette = d3.scale.ordinal().domain(domain).range(range);

  var chart4 = d3waffle("&#x273F")
                  .rows(10)
                  .colorscale(palette)
                  .appearancetimes(function(d, i){ return i*10 + Math.random()*250;})
                  .height(500);

  d3.select("#vis").append("svg")
    .attr("width", 600)
    .attr("height", 600)
    .attr("id", "waffle1")
    .datum(data2)
    .call(chart4)
    .attr("stroke", "#cc0000");
}

function d3waffle (iconCode) {
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      //icon = "&#11043;",
      icon = iconCode,
      scale = 1,
      rows = 10,
      adjust = 0.6,
      colorscale = d3.scale.category20(),
      appearancetimes = function(d, i){ return 500; },
      height = 200,
      magic_padding = 10;

  function chart(selection) {

    selection.each(function(data) {

      selection.selectAll("*").remove();

      /* setting parameters and data */
      var idcontainer = selection[0][0].id; // I need to change thiz plz
      var total = d3.sum(data, function(d) { return d.value; });

      /* updating data */
      data.forEach(function(d, i){
        data[i].class = slugify(d.name);
        data[i].scalevalue = Math.round(data[i].value*scale);
        data[i].percent = data[i].value/total;
      });

      var totalscales = d3.sum(data, function(d){ return d.scalevalue; })
      var cols = Math.ceil(totalscales/rows);
      var griddata = cartesianprod(d3.range(cols), d3.range(rows));
      var detaildata = [];

      data.forEach(function(d){
        d3.range(d.scalevalue).forEach(function(e){
          detaildata.push({ name: d.name, class: d.class })
        });
      });

      detaildata.forEach(function(d, i){
        detaildata[i].col = griddata[i][0];
        detaildata[i].row = griddata[i][1];
      })

      /*console.log("detail data length: ", detaildata.length)*/

      var gridSize = ((height - margin.top - margin.bottom) / rows)

      /* setting the container */
      var svg = selection.append("svg")
            .attr("width",  "100%")
            .attr("height", height + "px")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("cursor", "default");

      var tooltip = d3.select("body")
            .append("div")
            .attr("class", "waffle-tooltip")
            .style("position", "absolute")
            .style("text-align", "right")
            .style("background", "#333")
            .style("margin", "3px")
            .style("color","white")
            .style("padding","3px")
            .style("border","0px")
            .style("border-radius","3px") // 3px rule
            .style("opacity",0)
            .style("cursor", "default");

      var nodes = svg.selectAll(".node")
            .data(detaildata)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + (d.col)*gridSize + "," + (rows - d.row - 1)*gridSize  + ")"; });

      /* this is necesary, when the icons are small/thin activate mouseout */
      nodes.append("text")
            .style("opacity", 0)
            .html(icon)
            .attr('class', function(d){ return d.class; })
            .attr('font-family', 'FontAwesome')
            .attr("transform", function(d) { return "translate(" + gridSize/2 + "," + 5/6*gridSize  + ")"; })
            .style("text-anchor", "middle")
            .style('fill', function(d){ return colorscale(d.class); })
            .style("font-size", function(d) {
              val = 9;
              val2 = 2.5;
              textsize = Math.min(val2 * gridSize, (val2 * gridSize - val) / this.getComputedTextLength() * val);
              return textsize * adjust + "px";
            })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("mousemove", mousemove)
            .transition()
            .duration(appearancetimes)
            .style("opacity", 1);

      nodes.append("rect")
            .style("fill", "white")
            .attr('class', function(d){ return d.class; })
            .style("stroke", "gray")
						.style("margin", 5)
            .attr("width", gridSize)
            .attr("height", gridSize)
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("mousemove", mousemove)
            .style("opacity", 0)


      function mouseover(d){
        tooltip.transition().duration(100).style("opacity", .9);
        el = data.filter(function(e){ return e.name == d.name})[0]
        txt = "<b>" +el.name + "</b><br>" + d3.format(',')(el.value) + "<br>(" + d3.format(".0%")(el.percent) + ")"
        tooltip.html(txt);

        d3.select("#" + idcontainer).selectAll("text").transition().duration(100).style("opacity", 0.2);
        d3.select("#" + idcontainer).selectAll("text." + d.class).transition().duration(100).style("opacity", 1);
      }

      function mouseout(d){
        tooltip.transition().duration(100).style("opacity", 0);
        d3.select("#" + idcontainer).selectAll("text").transition().duration(100).style("opacity", 1);
      }

      function mousemove(d){
        tooltip
            .style("left", (d3.event.pageX + 0 ) + "px")
            .style("top", (d3.event.pageY + - 70) + "px");
      }

    });
  }

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.rows = function(_) {
    if (!arguments.length) return rows;
    rows = _;
    return chart;
  };

  chart.icon = function(_) {
    if (!arguments.length) return icon;
    icon = _;
    return chart;
  };

  chart.scale = function(_) {
    if (!arguments.length) return scale;
    scale = _;
    return chart;
  };

  chart.colorscale = function(_) {
    if (!arguments.length) return colorscale;
    colorscale = _;
    return chart;
  };

chart.appearancetimes = function(_) {
    if (!arguments.length) return appearancetimes;
    appearancetimes = _;
    return chart;
  };

chart.adjust = function(_) {
    if (!arguments.length) return adjust;
    adjust = _;
    return chart;
  };

  return chart;

}

function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .trim();                        // Trim - from end of text
}

/* http://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript */
function cartesianprod(paramArray) {

  function addTo(curr, args) {

    var i, copy,
        rest = args.slice(1),
        last = !rest.length,
        result = [];

    for (i = 0; i < args[0].length; i++) {

      copy = curr.slice();
      copy.push(args[0][i]);

      if (last) {
        result.push(copy);

      } else {
        result = result.concat(addTo(copy, rest));
      }
    }

    return result;
  }


  return addTo([], Array.prototype.slice.call(arguments));
}
