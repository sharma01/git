window.onload = function () {

		// dataPoints
		var dataPoints1 = [];
		var dataPoints2 = [];
        var dataPoints3 = [];
        var dataPoints4 = [];
        var dataPoints5 = [];
        var dataPoints6 = [];

		var chart = new CanvasJS.Chart("chartContainer",{
			zoomEnabled: true,
			title: {
				text: "Temperature Difference"		
			},
			toolTip: {
				shared: true
				
			},
			legend: {
				verticalAlign: "top",
				horizontalAlign: "center",
                fontSize: 14,
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
				name: "Actual",
				dataPoints: dataPoints1
			},
			{				
				// dataSeries2
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Target" ,
				dataPoints: dataPoints2
			},
                   { 
				// dataSeries3
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Actual",
				dataPoints: dataPoints3
			},
                   { 
				// dataSeries4
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Actual",
				dataPoints: dataPoints4
			},
                   { 
				// dataSeries5
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Actual",
				dataPoints: dataPoints5
			},
                   { 
				// dataSeries6
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Actual",
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



		var updateInterval = 1000;
		// initial value
		var yValue1 = 640; 
		var yValue2 = 604;
    var yValue3 = 650;
    var yValue4 = 610;
    var yValue5 = 620;
    var yValue6 = 660;

		var time = new Date;
	/*	time.setHours(9);
		time.setMinutes(00);
		time.setSeconds(00);
		time.setMilliseconds(00);*/
		// starting at 9.30 am

		var updateChart = function (count) {
			count = count || 1;

			// count is number of times loop runs to generate random dataPoints. 

			for (var i = 0; i < count; i++) {
				
				// add interval duration to time				
				time.setTime(time.getTime()+ updateInterval);


				// generating random values
				var deltaY1 = .5 + Math.random() *(-.5-.5);
				var deltaY2 = .5 + Math.random() *(-.5-.5);
                var deltaY3 = .5 + Math.random() *(-.5-.5);
                var deltaY4 = .5 + Math.random() *(-.5-.5);
                var deltaY5 = .5 + Math.random() *(-.5-.5);
                var deltaY6 = .5 + Math.random() *(-.5-.5);

				// adding random value and rounding it to two digits. 
				yValue1 = Math.round((yValue1 + deltaY1)*100)/100;
				yValue2 = Math.round((yValue2 + deltaY2)*100)/100;
                yValue3 = Math.round((yValue3 + deltaY3)*100)/100;
                yValue4 = Math.round((yValue4 + deltaY4)*100)/100;
                yValue5 = Math.round((yValue5 + deltaY5)*100)/100;
                yValue6 = Math.round((yValue6 + deltaY6)*100)/100;
				
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


			};

			// updating legend text with  updated with y Value 
			/*chart.options.data[0].legendText = " Actual  " + yValue1;
			chart.options.data[1].legendText = " Target  " + yValue2; */

			chart.render();

		};

		// generates first set of dataPoints 
		updateChart(3000);	
		 
		// update chart after specified interval 
		setInterval(function(){updateChart()},updateInterval);
	}