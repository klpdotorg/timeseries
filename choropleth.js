var data; // loaded asynchronously

xy = d3.geo.mercator().translate([-4220,1140]).scale(21000),
path = d3.geo.path().projection(xy);

var svg = d3.select("#chart")
  .append("svg");

var districts = svg.append("g")
    .attr("id", "districts")
    .attr("class", "Blues");

d3.json("data/districts.json", function(json) {
  districts.selectAll("path")
    .data(json.features)
    .enter().append("path")
    .attr("class", data ? quantize : null)
    .attr("d", path)
    .on("mouseover", mouseover);
});

d3.json("data/data04-05.json", function(json) {
  data = json;
  districts.selectAll("path")
      .attr("class", quantize);
});

function quantize(d) {
  district = data[d.properties['dist_code']];
  color = "q" + Math.min(7, ~~(district[0]['govt_pass'] / 20)) + "-9";
  return color;
}

function mouseover(d) {
 district = data[d.properties['dist_code']];
 d3.select("#infoname").text(d.properties['DISTSHP']);
 d3.select("#infoyear").text(district[0]['acad_year']);
 d3.select("#infovalue").text(district[0]['govt_pass']);
 }

function change_year(a) {
  d3.selectAll(".label").classed("label-info", false);
  d3.select(".year"+a).classed("label-info", true);
  d3.json("data/data"+a+".json", function(json) {
    data = json;
    districts.selectAll("path")
    // .transition()
    // .style("opacity", 0.1)
    // .transition()
    // .delay(300)
    .attr("class", quantize)
    // .transition()
    // .duration(1000)
    // .style("opacity", 1);
    })
  }

var start = d3.select("#start");
start.on("click", play);
years = ['04-05', '05-06', '06-07', '07-08', '08-09', '09-10', '10-11'];
var i = 0;

function play() {
  d3.select(".play").classed("btn-info", false);
  change_year(years[i]);
  setTimeout(update_year, 2000);

 };

function update_year() {
  i = i+1;
  if (i!=years.length) {
    play();
  }
  else {
    i=0;
    d3.select(".play").classed("btn-info", true);
  }
}

