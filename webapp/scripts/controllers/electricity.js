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
	    	$scope.chartJanConfig.series[0].type = 'areaspline';
	    	$scope.chartFebConfig.series[0].type = 'areaspline';
	    	$scope.chartMarConfig.series[0].type = 'areaspline';
	    	$scope.chartAprConfig.series[0].type = 'areaspline';
	    	$scope.chartMayConfig.series[0].type = 'areaspline';
	    	$scope.chartJunConfig.series[0].type = 'areaspline';
	    	$scope.chartJulConfig.series[0].type = 'areaspline';
	    	$scope.chartAugConfig.series[0].type = 'areaspline';
	    	$scope.chartSepConfig.series[0].type = 'areaspline';
	    	$scope.chartOctConfig.series[0].type = 'areaspline';
	    	$scope.chartNovConfig.series[0].type = 'areaspline';
	    	$scope.chartDecConfig.series[0].type = 'areaspline';
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
                        }, 5000);
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
    },

    // Grafovi za godišnji prikaz

    $scope.chartJanConfig = {
        chart: {
        	renderTo: 'chartJan',
        	showAxis: false
        },
        credits: {
            enabled: false
        },
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,                    
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
        }],
        loading: false
    },

    $scope.chartFebConfig = {
        chart: {
        	renderTo: 'chartFeb'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
            		null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
        }],
        loading: false
    },

    $scope.chartMarConfig = {
        chart: {
        	renderTo: 'chartMar'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,            
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
        }],
        loading: false
    },

    $scope.chartAprConfig = {
        chart: {
        	renderTo: 'chartApr'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586 ]
        }],
        loading: false
    },

    $scope.chartMayConfig = {
        chart: {
        	renderTo: 'chartMay'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,            
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
        }],
        loading: false
    },

    $scope.chartJunConfig = {
        chart: {
        	renderTo: 'chartJun'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
        }],
        loading: false
    },

    $scope.chartJulConfig = {
        chart: {
        	renderTo: 'chartJul'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,                    
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
        }],
        loading: false
    },

    $scope.chartAugConfig = {
        chart: {
        	renderTo: 'chartAug'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
        }],
        loading: false
    },

    $scope.chartSepConfig = {
        chart: {
        	renderTo: 'chartSep'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
        }],
        loading: false
    },

    $scope.chartOctConfig = {
        chart: {
        	renderTo: 'chartOct'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, ]
        }],
        loading: false
    },

    $scope.chartNovConfig = {
        chart: {
        	renderTo: 'chartNov'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,                    
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
        }],
        loading: false
    },

    $scope.chartDecConfig = {
        chart: {
        	renderTo: 'chartDec'
        },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
		},
		title: {
			text: ''
		},
        series: [{
            data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
        }],
        loading: false
    } 
});