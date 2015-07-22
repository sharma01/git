//$.getJSON( "http://localhost:8081/instrument/1/get", function( data ) {
	//parseFloat(data);  });
function getUrlParam(param)
{
  param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
  var regex = new RegExp("[?&]" + param + "=([^&#]*)");
  var url   = decodeURIComponent(window.location.href);
  var match = regex.exec(url);
  return match ? match[1] : "";
}


window.onload = function () {
	var param = getUrlParam("name");
	
	//$.getJSON( "http://localhost:8081/instrument/1/get", function( data ) {
	//parseFloat(data);});

		// dataPoints
		var length = 5;
		var dataPoints1 = [];
		
		var dataPoints2 = [];
		
        var dataPoints3 = [];
		
        var dataPoints4 = [];
		
        var dataPoints5 = [];
		
        var dataPoints6 = [];
		
		
		

		var chart = new CanvasJS.Chart("chartContainer",{
			zoomEnabled: true,
			title: {
				text: "Temperature"		
			},
			toolTip: {
				shared: true
				
			},
			legend: {
				verticalAlign: "top",
				horizontalAlign: "center",
                fontSize: 12,
				fontWeight: "bold",
				fontFamily: "calibri",
				fontColor: "dimGrey"
			},
			axisX: {
				title: "Time --> "
			},
			axisY:{
				includeZero: false
			}, 
			data: [{ 
				// dataSeries1
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "HB_Actual",
				dataPoints: dataPoints1
			},
			{				
				// dataSeries2
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "HB_Target" ,
				dataPoints: dataPoints2
			},
                   { 
				// dataSeries3
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "CH_Actual",
				dataPoints: dataPoints3
			},
                   { 
				// dataSeries4
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "CH_Target",
				dataPoints: dataPoints4
			},
                   { 
				// dataSeries5
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "NOZ_Actual",
				dataPoints: dataPoints5
			},
                   { 
				// dataSeries6
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "NOZ_Target",
				dataPoints: dataPoints6
			},
                  ],
            
          legend:{
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
              chart.render();
            }
          }
		});

		
		
		var updateInterval = 3000;

		var time = new Date;
	
		var updateChart = function () {			
		 
				
		$.getJSON( "/instrument/1/get", function( data ) {
					parseFloat(data);				
				
		var yValue1 = data.contextElement.attributes[1].value;
		var yValue2 = data.contextElement.attributes[2].value;
        var yValue3 = data.contextElement.attributes[3].value;
        var yValue4 = data.contextElement.attributes[4].value;
        var yValue5 = data.contextElement.attributes[5].value;
        var yValue6 = data.contextElement.attributes[6].value;
					 
				
				// add interval duration to time				
				time.setTime(time.getTime()+updateInterval);


				// adding random value and rounding it to two digits. 
				yValue1 = Math.round(yValue1);
				yValue2 = Math.round(yValue2);
                yValue3 = Math.round(yValue3);
                yValue4 = Math.round(yValue4);
                yValue5 = Math.round(yValue5);
                yValue6 = Math.round(yValue6);
				
				
				// pushing the new values
				dataPoints1.push({
					x: time.getTime(),
					y: yValue1
				});
				dataPoints2.push({
					x: time.getTime(),
					y: yValue2
				});
                
                dataPoints3.push({
					x: time.getTime(),
					y: yValue3
				});
                dataPoints4.push({
					x: time.getTime(),
					y: yValue4
				});
                dataPoints5.push({
					x: time.getTime(),
					y: yValue5
				});
                dataPoints6.push({
					x: time.getTime(),
					y: yValue6
				});
				
					
				});
				
				 
             chart.render();   
				setInterval(function(){updateChart()},updateInterval);
				
		 
            

			// updating legend text with  updated with y Value 
			/*chart.options.data[0].legendText = " Actual  " + yValue1;
			chart.options.data[1].legendText = " Target  " + yValue2; */

			//chart.render();

		}

		// generates first set of dataPoints 
		updateChart();
		chart.render();
		 
		// update chart after specified interval 
		//setInterval(function(){updateChart();},updateInterval);
		 
	}