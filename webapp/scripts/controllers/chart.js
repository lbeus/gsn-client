'use strict';

angular.module('gsnClientApp')
  .controller('ChartController', function ($scope, ChartService) {
    
    var enableDataLabels = false;
    var myData = [];

    $scope.chartTypes = ['areaspline','spline', 'column', 'area','line'];
    $scope.selectedChartType = $scope.chartTypes[0];
    
    Highcharts.setOptions({                                            // This is for all plots, change Date axis to local timezone
        global : {
            useUTC : false
        }
    });
    $scope.chartConfig = {
      chart: {
        renderTo: 'chartdiv',
        zoomType: 'x',
      },

      title: {
        text: ''
      },

      useHighStocks: false,

      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
        formatter: function() {
                return Highcharts.dateFormat('%l%p', Date.parse(this.value +' UTC'));
            }
      },

      yAxis: {
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
      },

      plotOptions: {
        area: {
          pointStart: 1,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
                hover: {
                    enabled: true
                }
            }
          }
        }
      },

      series: []
    };

    $scope.showResulChart = function() {
      myData = ChartService.getDataForChart($scope.selectedChart, $scope.selectedChart.name, $scope.selectedChartType);
      var seriesArray = $scope.chartConfig.series;
      for(var i = 0; i < seriesArray.length; i++)
      {
        seriesArray.splice(i, seriesArray.length)
      }
      //$scope.chartConfig.series[0].setData(chartData);

      for(var i = 0; i < myData.length; i++)
      {
        $scope.chartConfig.series.push(myData[i]);
      }
      //$scope.chartConfig.title = $scope.selectedChart.name;

    };
    
    $scope.seriesTypeChange = function(type) {
      $scope.chartConfig.series[0].type =  type;    
    };  
    
    $scope.toggleLabels = function () {
      enableDataLabels = !enableDataLabels;
      $scope.chartConfig.series[0].dataLabels.enabled =  enableDataLabels;        
    }
  });