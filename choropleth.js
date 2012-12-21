var data; // loaded asynchronously
var chart_data;
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

d3.json("data/govt_vs_non.json", function(json) {
  chart_data = json;
});

function quantize(d) {
  district_data = data[d.properties['dist_code']];
  color = "q" + Math.min(7, ~~(district_data[0]['govt_pass'] / 20)) + "-9";
  return color;
}

function mouseover(d) {
 district_data = data[d.properties['dist_code']];
 d3.select("#info").classed("hide", false);
 d3.select("#intro").classed("hide", true);
 d3.select("#infoname").text(d.properties['DISTSHP']);
 d3.select("#infoyear").text(district_data[0]['acad_year']);
 d3.select("#infovalueg").text(district_data[0]['govt_pass']+"%");
 d3.select("#infovaluep").text(district_data[0]['nongovt_pass']+"%");
}

function mouseout(){
  d3.select("#info").classed("hide", true);
  d3.select("#intro").classed("hide", false);
}

function clicked(d, i, district){
  selected_district_data = d;
  if (clicked_flag == false) {
    selected_district = district;
    d3.select(district).classed("clicked", true);
    districts.selectAll("path").on("mouseout", null);
    districts.selectAll("path").on("mouseover", null);
    draw(chart_data[selected_district_data.properties['dist_code']]);
    clicked_flag = true;
  }
  else {
    old_district = selected_district;
    selected_district = district;
    d3.select(old_district).classed("clicked", false);
    d3.select(district).classed("clicked", true);
    redraw(chart_data[selected_district_data.properties['dist_code']]);
    all_districts
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
  };

  mouseover(selected_district_data);
}

function change_year(a) {
  d3.selectAll(".label").classed("label-info", false);
  d3.select(".year"+a).classed("label-info", true);
  d3.json("data/data"+a+".json", function(json) {
    data = json;
    districts.selectAll("path")
    .attr("class", quantize)
    if (clicked_flag) {
      d3.select(selected_district).classed("clicked", true);
      mouseover(selected_district_data);
    };
  });
}

var start = d3.select("#start");
start.on("click", play);
years = ['04-05', '05-06', '06-07', '07-08', '08-09', '09-10', '10-11'];
var i = 0;

function play() {
  d3.select(".play").classed("btn-info", false);
  start.on("click", null);
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
    start.on("click", play);
  }
}

/* Code for graphs */

var n = 7, // number of samples
    m = 2; // number of series

    var w = 435,
    h = 150,
    x = d3.scale.linear().domain([50, 100]).range([h, 0]),
    y0 = d3.scale.ordinal().domain(d3.range(n)).rangeBands([0, w], .2),
    y1 = d3.scale.ordinal().domain(d3.range(m)).rangeBands([0, y0.rangeBand()]),
    colors = ["#9ECAE1", "#08306B"];


    var vis = d3.select("#graphs")
    .append("svg:svg")
    .append("svg:g")
    .attr("transform", "translate(10,10)");

    function draw(data) {
      var g = vis.selectAll("g")
      .data(data)
      .enter().append("svg:g")
      .attr("fill", function(d, i) { return colors[i]; })
      .attr("transform", function(d, i) { return "translate(" + y1(i) + ",0)"; });

      var rect = g.selectAll("rect")
      .data(function(data){return data;})
      .enter().append("svg:rect")
      .attr("transform", function(d, i) { return "translate(" + y0(i) + ",0)"; })
      .attr("width", y1.rangeBand())
      .attr("height", x)
      .transition()
      .delay(50)
      .attr("y", function(d) { return h - x(d); });

      var text = vis.selectAll("text")
      .data(d3.range(n))
      .enter().append("svg:text")
      .attr("class", "group")
      .attr("transform", function(d, i) { return "translate(" + y0(i) + ",0)"; })
      .attr("x", y0.rangeBand() / 2)
      .attr("y", h + 6)
      .attr("dy", ".71em")
      .attr("text-anchor", "middle")
      .text(function(d, i) { return years[i]; });

    }

    function redraw(data) {
      var g = vis.selectAll("g");
      g.data(data)
      .attr("fill", function(d, i) { return colors[i]; })
      .attr("transform", function(d, i) { return "translate(" + y1(i) + ",0)"; });      

      g.selectAll("rect")
      .data(function(data){return data;})
      .attr("transform", function(d, i) { return "translate(" + y0(i) + ",0)"; })
      .attr("width", y1.rangeBand())
      .attr("height", x)
      .transition()
      .delay(50)
      .attr("y", function(d) { return h - x(d); });
    }


/* Icons */

var imported_node;

d3.json("data/sample_bg.json", function(json) {
  samples = json;
  color_icons();
});


d3.xml("images/girl.svg", "image/svg+xml", function(xml) {
    imported_node = document.importNode(xml.documentElement, true);
    d3.selectAll(".bg").each(append_all);
  });

d3.xml("images/boy.svg", "image/svg+xml", function(xml) {
    imported_node = document.importNode(xml.documentElement, true);
    d3.selectAll(".bg").each(append_all);
  });

function append_all() {
var new_node = imported_node.cloneNode(true);
d3.select(this).node().appendChild(new_node);
}


function color_icons() {
  var govt = samples['BA'][0];  
  var pvt = samples['BA'][1];
  for (var i=0; i<govt.length; i++) {
    if (govt[i][0]<govt[i][1]) {
      d3.select("#bgg"+years[i]).select("#boy").transition().delay(500).attr("fill", "red");
      d3.select("#bgg"+years[i]).select("#girl").attr("fill", "#7c7c7c");
    }
    else {
      d3.select("#bgg"+years[i]).select("#boy").attr("fill", "#7c7c7c");
      d3.select("#bgg"+years[i]).select("#girl").attr("fill", "red");
    };
  };
  for (var i=0; i<pvt.length; i++) {
    if (pvt[i][0]<pvt[i][1]) {
      d3.select("#bgp"+years[i]).select("#boy").attr("fill", "red");
      d3.select("#bgp"+years[i]).select("#girl").attr("fill", "#7c7c7c");
    }
    else {
      d3.select("#bgp"+years[i]).select("#boy").attr("fill", "#7c7c7c");
      d3.select("#bgp"+years[i]).select("#girl").attr("fill", "red");
    };
  };
};
