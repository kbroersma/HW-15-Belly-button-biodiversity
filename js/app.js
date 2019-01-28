function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var urlsample = `/metadata/${sample}`;
  d3.json(urlsample).then(function(sample){
    var sampledata = d3.select("#sample-metadata"));

  sampledata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    
  object.entries(data).forEach([Key,VALUE]) =>{
    sampledata.append('h4').text ('${key};{value}');
  });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    var urlsample = `/samples/${sample}`;
    d3.json(urlsample).then(function(data) {
  
  
      var x_value = data.otu_ids;
      var y_value = data.sample_values;
      var size_med = data.sample_values;
      var colored = data.otu_ids; 
      var values = data.otu_labels;
  
      var trace = {
        x: x_value,
        y: y_value,
        text: values,
        mode: 'markers',
        marker: {
          color: colored,
          size: size_med
        } 
      };
      var data = [trace];

      var layout = {
        xaxis: { title: "OTU ID"},
      };
  
      Plotly.Plot('bubble', data, layout);


    // @TODO: Build a Pie Chart

    var pie = [
      {
        values: y_values.slice(0, 10),
        label: x_values.slice(0, 10),
        hovertext: values.slice(0, 10),
        hoverinfo: "pie_hover",
        type: "Pie_Chart"
      }
    ];

    var data = {
      margin: { t: 0, l: 0 }
    };

    Plotly.plot("Pie_Chart", pie, data);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
