  var data; // loaded asynchronously
  var chart_data;
  var selected_district = null;
  var clicked_flag = false;
  var selected_district_data = null;
  var imported_node;
  var girl_vs_boy;
  var math, english, kannada;
  var all_data;
  var moi;

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


  d3.json("data/data.json", function(json) {
    all_data = json;
    initialize();
  });

  function initialize(){
    data = all_data['04-05'][0];
    districts.selectAll("path")
    .attr("class", quantize);
  };

  d3.json("data/govt_vs_non.json", function(json) {
    chart_data = json;
  });


  d3.json("data/girl_vs_boy.json", function(json) {
    girl_vs_boy = json;
  });

  d3.json("data/math.json", function(json) {
    math = json;
  });

  d3.json("data/english.json", function(json) {
    english = json;
  });

  d3.json("data/kannada.json", function(json) {
    kannada = json;
  });

  d3.json("data/moi.json", function(json) {
    moi = json;
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
   d3.select("#header-infoname").text(d.properties['DISTSHP']);
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
    subj_draw(math[selected_district_data.properties['dist_code']], math_vis);
    subj_draw(english[selected_district_data.properties['dist_code']], english_vis);
    subj_draw(kannada[selected_district_data.properties['dist_code']], kannada_vis);
    bubble_draw(selected_district_data.properties['dist_code']);
    clicked_flag = true;
  }
  else {
    old_district = selected_district;
    selected_district = district;
    d3.select(old_district).classed("clicked", false);
    d3.select(district).classed("clicked", true);
    redraw(chart_data[selected_district_data.properties['dist_code']]);
    subj_redraw(math[selected_district_data.properties['dist_code']], math_vis);
    subj_redraw(english[selected_district_data.properties['dist_code']], english_vis);
    subj_redraw(kannada[selected_district_data.properties['dist_code']], kannada_vis);
    bubble_redraw(selected_district_data.properties['dist_code']);
    all_districts
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
  };
  d3.select("#gender").classed("hide", false);
  d3.select(".subject-title").classed("hide", false);
  d3.select("#medium").classed("hide", false);
  color_icons(selected_district_data.properties['dist_code']);
  mouseover(selected_district_data);
}

function change_year(a) {
  d3.selectAll(".label").classed("label-info", false);
  d3.selectAll(".year"+a).classed("label-info", true);
  data = all_data[a][0];
  districts.selectAll("path")
  .attr("class", quantize)
  if (clicked_flag) {
    d3.select(selected_district).classed("clicked", true);
    mouseover(selected_district_data);
    bubble_redraw(selected_district_data.properties['dist_code'], a);
  };
}

var start = d3.select("#start");
start.on("click", play);
years = ['04-05', '05-06', '06-07', '07-08', '08-09', '09-10', '10-11', '11-12'];
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

  var n = 8, // number of samples
      m = 2; // number of series

      var w = 435,
      h = 150,
      x = d3.scale.linear().domain([50, 100]).range([0, h]),
      y0 = d3.scale.ordinal().domain(d3.range(n)).rangeBands([0, w], .2),
      y1 = d3.scale.ordinal().domain(d3.range(m)).rangeBands([0, y0.rangeBand()]),
      colors = ["#9ECAE1", "#08306B"];

      function pass_over(d){
        change_year(years[d3.select(this).attr("class")]);
      }
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

        var rect = g.selectAll("rect");

        rect
        .data(function(data){return data;})
        .enter().append("svg:rect")
        .on("mouseover", pass_over)
        .attr("transform", function(d, i) { return "translate(" + y0(i) + ",0)"; })
        .attr("width", y1.rangeBand())
        .attr("height", x)
        .attr("class", function(d, i) {return i;})
        .transition()
        .delay(50)
        .attr("y", function(d) { return h - x(d); });

       // rect.data(function(data){return data;})
       // .enter()
       // .append("text")
       // .text(function(d) {return d;})
       // .attr("transform", function(d, i) { return "translate(" + y0(i) + ",0)"; })
       // .attr("x", y0.rangeBand() / 4)
       //  .attr("y", h - 20)
       //  .attr("dy", ".71em")
       // .attr('text-anchor', 'middle')
       // .attr("fill", "white");

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

    d3.selectAll('.bg').each(function(d,i){$(this).tipsy({gravity: 'ne', title: function(){
    // parent_div = d3.select(this).node().parentNode;
    year = d3.select(this).attr('year');
    type = d3.select(this).attr('type');
    code = selected_district_data.properties['dist_code'];
    govt = girl_vs_boy[code][0];  
    pvt = girl_vs_boy[code][1];
    if (type == 'govt') {
      var value_g = govt[years.indexOf(year)][0];
      var value_b = govt[years.indexOf(year)][1];
      return "Girls: "+value_g+"%, Boys: "+value_b+"%";
    }

    if (type == 'pvt') {
      var value_g = pvt[years.indexOf(year)][0];
      var value_b = pvt[years.indexOf(year)][1];
      return "Girls: "+value_g+"%, Boys: "+value_b+"%";
    };
  }});});

    function color_icons(code) {
      var govt = girl_vs_boy[code][0];  
      var pvt = girl_vs_boy[code][1];
      for (var i=0; i<govt.length; i++) {
        if (govt[i][0]<govt[i][1]) {
          d3.select("#bgg"+years[i]).select("#boy").transition().delay(200).attr("fill", "#098a05");
          d3.select("#bgg"+years[i]).select("#girl").attr("fill", "#a6a6a6");
        }
        else {
          d3.select("#bgg"+years[i]).select("#boy").attr("fill", "#a6a6a6");
          d3.select("#bgg"+years[i]).select("#girl").transition().delay(200).attr("fill", "#098a05");
        };
      };
      for (var i=0; i<pvt.length; i++) {
        if (pvt[i][0]<pvt[i][1]) {
          d3.select("#bgp"+years[i]).select("#boy").transition().delay(200).attr("fill", "#098a05");
          d3.select("#bgp"+years[i]).select("#girl").attr("fill", "#a6a6a6");
        }
        else {
          d3.select("#bgp"+years[i]).select("#boy").attr("fill", "#a6a6a6");
          d3.select("#bgp"+years[i]).select("#girl").transition().delay(200).attr("fill", "#098a05");
        };
      };
    };

    /* Subject charts */

    var subj_w = 250,
    subj_h = 60,
    subj_x = d3.scale.linear().domain([0, 100]).range([20, subj_h]),
    subj_y0 = d3.scale.ordinal().domain(d3.range(n)).rangeBands([0, subj_w], .2),
    subj_y1 = d3.scale.ordinal().domain(d3.range(m)).rangeBands([0, subj_y0.rangeBand()]);

    var math_vis = d3.select("#math")
    .append("svg:svg")
    .append("svg:g")
    .attr("transform", "translate(20,-30)");


    var english_vis = d3.select("#english")
    .append("svg:svg")
    .append("svg:g")
    .attr("transform", "translate(20,-30)");


    var kannada_vis = d3.select("#kannada")
    .append("svg:svg")
    .append("svg:g")
    .attr("transform", "translate(20,-30)");

    function subjects_over(d) {
      d3.select("#percent").text(d);
    }

    function subj_draw(data, div) {
      var g = div.selectAll("g")
      .data(data)
      .enter().append("svg:g")
      .attr("fill", function(d, i) { return colors[i]; })
      .attr("transform", function(d, i) { return "translate(" + subj_y1(i) + ",0)"; });

      var rect = g.selectAll("rect")

      rect
      .data(function(data){return data;})
      .enter().append("svg:rect")
      .attr("transform", function(d, i) { return "translate(" + subj_y0(i) + ",0)"; })
      .attr("width", subj_y1.rangeBand())
      .attr("height", subj_x)
      .attr("d", function(d){return d;})
      .transition()
      .delay(50)
      .attr("y", function(d) { return h - subj_x(d); });

      var text = div.selectAll("text")
      .data(d3.range(n))
      .enter().append("svg:text")
      .attr("class", "group")
      .attr("transform", function(d, i) { return "translate(" + subj_y0(i) + ",0)"; })
      .attr("x", subj_y0.rangeBand() / 2)
      .attr("y", h + 6)
      .attr("dy", ".51em")
      .attr("text-anchor", "middle")
      .attr("font-size", ".8em")
      .text(function(d, i) { return years[i]; });

      div.selectAll("rect").each(function(d,i) {$(this).tipsy({gravity: 's', title: function(){
        parent_svg = d3.select(div.node().parentNode);
        parent_div = d3.select(parent_svg.node().parentNode);
        return parent_div.attr("subject")+": "+d3.select(this).attr("d")+"%";}})});

    }

    function subj_redraw(data, div) {
      var g = div.selectAll("g");
      g.data(data)
      .attr("fill", function(d, i) { return colors[i]; })
      .attr("transform", function(d, i) { return "translate(" + subj_y1(i) + ",0)"; });      

      g.selectAll("rect")
      .data(function(data){return data;})
      .attr("transform", function(d, i) { return "translate(" + subj_y0(i) + ",0)"; })
      .attr("width", subj_y1.rangeBand())
      .attr("height", subj_x)
      .attr("d", function(d){return d;})
      .transition()
      .delay(50)
      .attr("y", function(d) { return h - subj_x(d); });
    }


    /* Bubble chart */

    var diameter = 500,
    format = d3.format(",d"),
    bubble_color = ["#3182bd", "#e6550d", "#31a354", "#636363"];

    var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

    var bubble_svg = d3.select("#bubble").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

// d3.json("data/moi04-05.json", function(json) {
//   // console.log(bubble.nodes(json["BE"][0]));
function bubble_draw(code, year) {
  if (!year) {
    year = '04-05';
  };
  bubble_data = moi[year][0][code][0];
  var node = bubble_svg.selectAll(".node")
  .data(bubble.nodes(classes(bubble_data))
    .filter(function(d) { return !d.children; }))
  .enter().append("g")
  .attr("class", "node")
  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
  .text(function(d) { return d.name + ": " + format(d.value); });

  node.append("circle")
  .transition()
  .delay(50)
  .attr("r", function(d, i) { return d.r; })
  .style("fill", function(d,i) {return bubble_color[i]});

  node.append("text")
  .attr("dy", ".3em")
  .style("text-anchor", "middle")
  .text(function(d) { return d.name.substring(0, d.r / 3) +" - "+String(d.value).substring(0, d.r/3); });
};

function bubble_redraw(code, year) {
  if (!year) {
    year = '04-05';
  };
  bubble_data = moi[year][0][code][0];
  var node = bubble_svg.selectAll(".node")
  .data(bubble.nodes(classes(bubble_data))
    .filter(function(d) {return !d.children;}))
  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.select("title").text(function(d) {return d.name + ": " + format(d.value);});
  node.select("circle").transition().delay(50).attr("r", function(d,i) {return d.r; })
  .style("fill", function(d,i) {return bubble_color[i]});
  node.select("text").text(function(d) { return d.name.substring(0, d.r / 3) +" - "+String(d.value).substring(0, d.r/3); });  

}

function classes(root) {
  names = ["English", "Kannada", "Urdu", "Others"]
  var classes = [];
  root.forEach(function(val,i) {classes.push({name:names[i],value:Number(val)})});
  return {children:classes};
}

d3.select(self.frameElement).style("height", diameter + "px");