function getData(id) {
	d3.json("data/samples.json").then(function(data){
	//console.log(data);

		var metadata = data.metadata.filter(s => s.id.toString() === id.toString())[0];
    	var display = d3.select("#sample-metadata");
		display.html("");
		
        var selection = display.append("ul");
        selection.classed("list-group", true);
		selection.classed("list-group-flush", true);
		
        Object.entries(metadata[0]).forEach(([key, value]) => {
            var item = selection.append('li');
            item.classed('list-group-item', true);
            item.html(`${key}: ${value}`);
        });
	});

}


function bubbleChart(id) {
	d3.json("data/samples.json").then(function(data){
	//console.log(data);
    
		var samples = data.samples.filter(s => s.id.toString() === id)[0];
		//console.log(samples);
		var sample_values = samples.sample_values;
    	var otu_ids = samples.otu_ids;
		var otu_ids = otu_ids.map(s => s.toString());
		var otu_labels = samples.otu_labels;
		
		var trace1 = {
			y: sample_values,
			x: otu_ids,
			mode: 'markers',
			marker: {
				color: otu_ids,
				size: sample_values,
			},
			text: otu_labels,
		};

		var layout = {
			xaxis: {
				title:"Bubble Chart",
				xaxis: "OTU IDs"
			},
		};

    	var data = [trace1];
		
		Plotly.newPlot("bubble", data, layout);
		});
};


function guageChart(id) {
	d3.json("data/samples.json").then(function(data){
	//console.log(data);
  		var metadata = data.metadata.filter(d => d.id.toString() === id.toString())[0];
    	var data = [
		   {
			domain: { x: [0, 1], y: [0, 1] },
		    value: parseInt(metadata.wfreq),
		    title: { text: "Belly Button Washing Frequency"},
		    type: "indicator",
	  	    mode: "gauge+number",
			gauge: {
				axis: { range: [null, 10] },
				steps: [
					{ range: [0, 1], color: "black"},
					{ range: [1, 2], color: "brown" },
					{ range: [2, 3], color: "green" },
					{ range: [3, 4], color: "yellowgreen" },
					{ range: [4, 5], color: "yellow" },
					{ range: [5, 6], color: "orange" },
					{ range: [6, 7], color: "orangered" },
					{ range: [7, 8], color: "red" },
					{ range: [8, 9], color: "darkred" },
					{ range: [9, 10], color: "white" }
				]
			}
		   }
	    ];
		Plotly.newPlot('gauge', data);
	});
};


function barChart(id) {
	d3.json("data/samples.json").then(function(data){
   		var samples = data.samples.filter(s => s.id.toString() === id)[0];
    	var sample_values = samples.sample_values.slice(0,10).reverse();
		var otu_ids = samples.otu_labels.slice(0,10).reverse();
		var otu_ids = otu_ids.map(d => d.toString());
		var otu_labels = samples.otu_labels.slice(0,10).reverse();
		
		var trace2 = {
			x: sample_values,
			y: otu_ids,
			text: otu_labels,
			type: "bar",
			orientation: "h"
		};
		var data = [trace2];

		Plotly.newPlot("bar", data);
	});
};


function init() {
	var dropMenu = d3.select("#selDataset");
	d3.json("data/samples.json").then(function(data){
	//console.log(data);
		var ids = data.names;

		dropMenu.selectAll("option")
		.data(ids)
		.enter()
		.append("option")
		.attr("value", function (d) { return d; })
		.text(function (d) { return d; });

		var name = ids[0];
		getData(ids);
		barChart(ids);
		bubbleChart(ids);
		guageChart(ids);
	});
}
	
init();
