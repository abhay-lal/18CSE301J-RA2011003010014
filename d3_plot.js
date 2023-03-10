// Set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 50, left: 50},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Read the data from the CSV file
d3.text("../datafile.csv").then(function(text) {
  var data = d3.csvParse(text, function(d) {
    return {
      x: d.x,
      y: +d.y // Convert y values to numbers
    };
  });
  // Create the X and Y scales
  var x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(function(d) { return d.x; }))
    .padding(0.2);

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, function(d) { return d.y; })]);

  // Add the X and Y axes to the SVG
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));

  // Add the bars to the chart
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.x); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.y); })
      .attr("height", function(d) { return height - y(d.y); });
});

