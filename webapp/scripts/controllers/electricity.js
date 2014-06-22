'use strict';

angular.module('gsnClientApp')
  .controller('ElectricityController', function ($scope,  GaugeService, ChartService, $http) {
  	var chart;
	var data = [];
	var value = -40;
	var sensorName = 'temprabbit';
	var request = {};
	var selected = false;

	$scope.fetchData = function() {
      request["download_format"] = "xml";
      request["vs[0]"] = sensorName;
      request["field[0]"] = 'temperatura';
      selected = true;
      $http({
              method: 'POST',
              url: '/multidata',
              data: request,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (data) {
            	$scope.results = ChartService.parseXML(data);            	
        });
    };

    $scope.InitPage = function()
    {
    	if(selected)
    	{
			var myData = ChartService.getDataForDayChart($scope.selectedSensor, $scope.fromFormated, $scope.untilFormated, 'temperatura');
			var seriesArray = $scope.chartDayConfig.series;
			for(var i = 0; i < seriesArray.length; i++)
			{
				seriesArray.splice(i, seriesArray.length)
			}

			for(var i = 0; i < myData.length; i++)
			{
				seriesArray.push(myData[i]);
			}
	    	$scope.chartDayConfig.series[0].type = 'areaspline';
    	}    	
    }

    $scope.fromChanged = function() {
        var d = new Date($scope.from);
        var curr_date = getDay(d);
        var curr_month = getMonth(d);
        var curr_year = d.getFullYear();
        var hh = getHours(d);
        var mm = getMinutes(d);

        $scope.fromFormated = curr_date + "/" + curr_month + "/" + curr_year+" " +hh+":"+mm+":00";
    };

     $scope.untilChanged = function() {
        var d = new Date($scope.until);
        var curr_date = getDay(d);
        var curr_month = getMonth(d);
        var curr_year = d.getFullYear();
        var hh = getHours(d);
        var mm = getMinutes(d);

        $scope.untilFormated = curr_date + "/" + curr_month + "/" + curr_year+" " +hh+":"+mm+":00";
    };

	$(function () {
	    var container_gauge1 = new Highcharts.Chart({
		
		    chart: {
		    	renderTo: 'container_gauge1',
		        type: 'gauge',
		        plotBackgroundColor: null,
		        plotBackgroundImage: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        events: {
                    load: function() {
                        // set up the updating of the chart each second
           		        var point = this.series[0].points[0],
                        	y;
                        setInterval(function() {
                    		GaugeService.async(sensorName, "temperatura").then(function(d) {
						    	data.push(d.data);
						  	});
                            //y = fetchData("temprabbit", "temperatura");
                            //alert(data.pop());
                            y = ChartService.parseGaugeXML(data.pop(), "temperatura");
						    if(typeof y != "undefined")
						    {
		        				point.update(parseInt(y));
		        			}
                        }, 500000);
                    }
                }
		    },
		    
		    title: {
		        text: 'ElectricityMeter'
		    },
		    
		    pane: {
		        startAngle: -150,
		        endAngle: 150,
		        background: [{
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#FFF'],
		                    [1, '#333']
		                ]
		            },
		            borderWidth: 0,
		            outerRadius: '109%'
		        }, {
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#333'],
		                    [1, '#FFF']
		                ]
		            },
		            borderWidth: 1,
		            outerRadius: '107%'
		        }, {
		            // default background
		        }, {
		            backgroundColor: '#DDD',
		            borderWidth: 0,
		            outerRadius: '105%',
		            innerRadius: '103%'
		        }]
		    },
		       
		    // the value axis
		    yAxis: {
		        min: -40,
		        max: 40,
		        
		        minorTickInterval: 'auto',
		        minorTickWidth: 1,
		        minorTickLength: 10,
		        minorTickPosition: 'inside',
		        minorTickColor: '#666',
		
		        tickPixelInterval: 30,
		        tickWidth: 2,
		        tickPosition: 'inside',
		        tickLength: 10,
		        tickColor: '#666',
		        labels: {
		            step: 2,
		            rotation: 'auto'
		        },
		        title: {
		            text: '°C'
		        },
		        plotBands: [{
		            from: -40,
		            to: 0,
		            color: '#55BF3B' // green
		        }, {
		            from: 0,
		            to: 30,
		            color: '#DDDF0D' // yellow
		        }, {
		            from: 30,
		            to: 40,
		            color: '#DF5353' // red
		        }]        
		    },
		
		    series: [{
		        name: 'Temperature',
		        data: [-40],
		        tooltip: {
		            valueSuffix: ' °C'
		        }
		    }]
		});



		var container_gauge2 = new Highcharts.Chart({
		
		    chart: {
		    	renderTo: 'container_gauge2',
		        type: 'gauge',
		        plotBackgroundColor: null,
		        plotBackgroundImage: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        events: {
                    load: function() {
                        // set up the updating of the chart each second
           		        var point = this.series[0].points[0],
                        	y;
                        setInterval(function() {
                    		GaugeService.async(sensorName, "temperatura").then(function(d) {
						    	data.push(d.data);
						  	});
                            //y = fetchData("temprabbit", "temperatura");
                            //alert(data.pop());
                            y = ChartService.parseGaugeXML(data.pop(), "temperatura");
						    if(typeof y != "undefined")
						    {
		        				point.update(parseInt(y));
		        			}
                        }, 500000);
                    }
                }
		    },
		    
		    title: {
		        text: 'ElectricityMeter'
		    },
		    
		    pane: {
		        startAngle: -150,
		        endAngle: 150,
		        background: [{
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#FFF'],
		                    [1, '#333']
		                ]
		            },
		            borderWidth: 0,
		            outerRadius: '109%'
		        }, {
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#333'],
		                    [1, '#FFF']
		                ]
		            },
		            borderWidth: 1,
		            outerRadius: '107%'
		        }, {
		            // default background
		        }, {
		            backgroundColor: '#DDD',
		            borderWidth: 0,
		            outerRadius: '105%',
		            innerRadius: '103%'
		        }]
		    },
		       
		    // the value axis
		    yAxis: {
		        min: -40,
		        max: 40,
		        
		        minorTickInterval: 'auto',
		        minorTickWidth: 1,
		        minorTickLength: 10,
		        minorTickPosition: 'inside',
		        minorTickColor: '#666',
		
		        tickPixelInterval: 30,
		        tickWidth: 2,
		        tickPosition: 'inside',
		        tickLength: 10,
		        tickColor: '#666',
		        labels: {
		            step: 2,
		            rotation: 'auto'
		        },
		        title: {
		            text: '°C'
		        },
		        plotBands: [{
		            from: -40,
		            to: 0,
		            color: '#55BF3B' // green
		        }, {
		            from: 0,
		            to: 30,
		            color: '#DDDF0D' // yellow
		        }, {
		            from: 30,
		            to: 40,
		            color: '#DF5353' // red
		        }]        
		    },
		
		    series: [{
		        name: 'Temperature',
		        data: [-40],
		        tooltip: {
		            valueSuffix: ' °C'
		        }
		    }]
		});
	});

    Highcharts.setOptions({                                            
        global : {
            useUTC : false
        }
    });

    $scope.chartDayConfig = {
        chart: {
        	renderTo: 'chartDay'
        },

		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
			labels: {
				formatter: function() {
					return Highcharts.dateFormat('%H:%M:%S', this.value);
				}
			}
		},

		title: {
			text: ''
		},

        series: [],

        loading: false
    }
});