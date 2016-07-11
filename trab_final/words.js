
  function MapReduceClass(){
	  var all = {};

	  this.reduceAdd = function (p,v) {
	  	if(!(v.name in all)){
	  		all[v.name] = 1;
	  		return p+1;
	  	}else{
	  		all[v.name] ++;
	  		if (all[v.name] == 1) {  			
	  			return p+1;
	  		}else{
	  			return p;
	  		}
	  	}
	  }
	  this.reduceRemove = function (p,v) {
	  	if(!(v.name in all)){
	  		all[v.name] = 0;
	  		return p;
	  	}else{
	  		all[v.name] --;
	  		if (all[v.name] == 0) {  			
	  			return p-1;
	  		}else{
	  			return p;
	  		}
	  	}
	  }
	  this.reduceInit = function () {
	    return 0;
	  }
  }

var row = dc.rowChart("#row_words");
var pie = dc.pieChart("#pie_words");
var bar = dc.barChart("#bar_words");


d3.csv("data/data_words.csv", function(error, data) {

  var i = 0;
  data.forEach(function(x) {
    x.count = +x.count;
    x.countUni = +x.countUni;
    x.id = i;
    i++;
  });

  data = data.filter(function(x){return x.count > 0});

  var ndx = crossfilter(data);
  var word_dimension = ndx.dimension(function(d) {return d.word;});
  var word_group = word_dimension.group()
                       .reduceSum(function(d) {return d.count;});
  var party_dimension = ndx.dimension(function(d) {return d.party;});
  mp1 = new MapReduceClass();
  
  var party_group = party_dimension.group().reduce(mp1.reduceAdd,mp1.reduceRemove,mp1.reduceInit);
  var vote_dimension = ndx.dimension(function(d) {return d.vote;});

  mp2 = new MapReduceClass();
  var vote_group = vote_dimension.group().reduce(mp2.reduceAdd,mp2.reduceRemove,mp2.reduceInit);                     

  row
    .width(500)
    .height(600)
    .renderTitle(true)
    .gap(2)
    .dimension(word_dimension)
    .group(word_group)
    .ordering(function(d){ return -d.value})
    .controlsUseVisibility(true)
    .elasticX(true)
    .label(function (d) {
      return d.key;
    })

  pie
    .width(300)
    .height(300)
    .dimension(party_dimension)
    .group(party_group)
    .innerRadius(40)
    .slicesCap(12)
    .minAngleForLabel(0.1)
    .controlsUseVisibility(true);


  bar
    .width(350)
    .height(230)
    .dimension(vote_dimension)
    .group(vote_group)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .controlsUseVisibility(true);

  dc.renderAll();
});
