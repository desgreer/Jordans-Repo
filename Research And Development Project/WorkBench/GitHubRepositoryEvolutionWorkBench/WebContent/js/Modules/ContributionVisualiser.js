/**
 * 
 */

var darwin = darwin || {};

darwin.ContributionVisualiser = (function () {
    return {
    	draw: function (dates, values, xAxis, chartTitle) {
    		  
    		//create data element for the chart
    	    var data = new google.visualization.DataTable();   
    	    
    	    //add column to represent time passing
    	    data.addColumn('string', xAxis)
    	       
    	    //add a new column for each input project
    	    for(var i=0;i<values.length;i++){
    	    	data.addColumn('number', '');	
    	    }
    	        	   	    
    	    //add data to each row, a a numeral for the y axis and string for x
	    	for(var j =0;j<values[0].length-1;j++){
    	    	if(values.length == 2){
        	    	data.addRow(["sample: " + j, values[0][j],values[1][j]]);
    	    	} else if(values.length == 3){
        	    	data.addRow(["sample: " + j, values[0][j],values[1][j],values[2][j]]);
    	    	}else if(values.length == 4){
        	    	data.addRow(["sample: " + j, values[0][j],values[1][j],values[2][j],values[3][j]]);
  	    		}else if(values.length == 5){
        	    	data.addRow(["sample: " + j, values[0][j],values[1][j],values[2][j],values[3][j],values[4][j]]);
	    		}else {
        	    	data.addRow([dates[j].getMonth()+1  + "-" + dates[j].getFullYear(), values[0][j]]);
    	    	}
	    	}
    	    	
	    	//populate additional iptions
    	    var options = {
    	      title: chartTitle,
    	      hAxis: { slantedText:true, slantedTextAngle:45 }, 
    	      chartArea:{
    	          left: 100, width: '95%'
    	      },
    	      legend: {position: 'top'},
    	      height: 550,
    	      width: 1450,
			  curveType: 'function',
    	      animation:{
    	          duration: 800,
    	          easing: 'out',
    	          startup: true,
    	        }
    	    };
    	        
    	    // Create and draw the visualization - change depending on type of chart
    	    if(darwin.currentContrubutionAction == "LOC"){
    	        new google.visualization.SteppedAreaChart(document.getElementById('contributorChart')).draw(data, options);
    	    } else {
    	    	new google.visualization.LineChart(document.getElementById('contributorChart')).draw(data, options);
    	    }
    	    
    	    //update ui
    	    darwin.Mediator.updateProgressBar();
        },
        populateSupplementaryStats: function(LOC, totalWeeks){
        	$('#contributorTotalWeeks').text('Total Amount Of Weeks on GitHub: ' + totalWeeks);
        	$('#contributorLOC').text('Total Lines Of Code On GitHub: ' + LOC);
        }
    };
})();