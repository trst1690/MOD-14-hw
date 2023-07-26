const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


    
    function buildbubble(selectedid){
    
    d3.json(url).then(function(data) {
        console.log(data.samples);
    //console.log(result)
    var result = data.samples.filter(sampid => sampid.id == selectedid)
    otu_ids = result[0].otu_ids
    sample_values = result[0].sample_values
    otu_labels = result[0].otu_labels

    var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        text: otu_labels,
        marker: {
          size: sample_values,
          color: otu_ids,
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Marker Size',
       
      };
      
      Plotly.newPlot('bubble', data, layout);
    });}
    buildbubble("941")

    function barchart(selectedid){
      
    d3.json(url).then(function(data) {
        console.log(data.samples);
    
    var result = data.samples.filter(sampid => sampid.id == selectedid)
    otu_ids = result[0].otu_ids.slice(0,10)
    sample_values = result[0].sample_values.slice(0,10)
    otu_labels = result[0].otu_labels.slice(0,10)
    console.log(result)
       
    var trace2 = {
      x : sample_values.reverse(),
      y : otu_ids.map( number => `OTU   ${number}`).reverse(),
      text : otu_labels.reverse(),
      type : 'bar',
      orientation: "h"


    };

    var data2 = [trace2]

    var layout = { margin: {
      l: 100,
      r: 100,
      t: 0,
      b: 100,
      },
      height: 500,
      width: 600




    }
    Plotly.newPlot("bar", data2, layout);

  });}
  barchart('941')

  function metadata(selectedid){
    
    d3.json(url).then(function(data) {
        console.log(data.metadata);
    
    var result = data.metadata.filter(sampid => sampid.id == selectedid)[0]
    
    metadata2 = d3.select("#sample-metadata")

    metadata2.html("")
   for (key in result){
    metadata2.append("p").text(` ${key}: ${result[key]}`);
    
   }
   
    
    
  
  
  
  
  
  
  })}

   metadata('941') 

   function createDropdown(data) {
    const selector = d3.select("#selDataset");
    data.names.forEach((name) => {
      selector.append("option").text(name).attr("value", name);
    });
  }

  d3.json(url).then(function(data) {
    createDropdown(data);
  });
    
  function updateVisualizations(selectedID) {
    barchart(selectedID);
    buildbubble(selectedID);
    metadata(selectedID);

  }

  function handleDropdownChange() {
    const selectedID = d3.select("#selDataset").property("value");
    updateVisualizations(selectedID);
  }

  d3.select("#selDataset").on("change", handleDropdownChange);



  


  

