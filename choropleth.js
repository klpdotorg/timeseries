var data; // loaded asynchronously
var selected_district = null;
var clicked_flag = false;
var selected_district_data = null;

xy = d3.geo.mercator().translate([-4220,1140]).scale(21000),
path = d3.geo.path().projection(xy);

var svg = d3.select("#chart")
  .append("svg");

var districts = svg.append("g")
    .attr("id", "districts")
    .attr("class", "Blues");

all_districts = districts.selectAll("path");

d3.json("data/districts.json", function(json) {
  all_districts
    .data(json.features)
    .enter().append("path")
    .attr("class", data ? quantize : null)
    .attr("d", path)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("click", function(d,i) { clicked(d, i, this); });

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
 d3.select("#info").classed("hide", false);
 d3.select("#intro").classed("hide", true);
 d3.select("#infoname").text(d.properties['DISTSHP']);
 d3.select("#infoyear").text(district[0]['acad_year']);
 d3.select("#infovalueg").text(district[0]['govt_pass']+"%");
 d3.select("#infovaluep").text(district[0]['nongovt_pass']+"%");
 }

function mouseout(){
  d3.select("#info").classed("hide", true);
  d3.select("#intro").classed("hide", false);
}

function clicked(d, i, district){
  mouseover(d);
  selected_district_data = d;
  if (clicked_flag == false) {
    selected_district = district;
    d3.select(district).classed("clicked", true);
    districts.selectAll("path").on("mouseout", null);
    districts.selectAll("path").on("mouseover", null);
    clicked_flag = true;
  }
  else {
  old_district = selected_district;
  selected_district = district;
  d3.select(old_district).classed("clicked", false);
  d3.select(district).classed("clicked", true);
  all_districts
  .on("mouseover", mouseover)
  .on("mouseout", mouseout);
  };
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
    if (selected_district_data) {
    d3.select(selected_district).classed("clicked", true);
    mouseover(selected_district_data);
    };
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

