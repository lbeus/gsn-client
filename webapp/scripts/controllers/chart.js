'use strict';

angular.module('gsnClientApp')
  .controller('ChartController', function ($scope, ChartService) {
    
    var enableDataLabels = false;
    var myData = [];

    $scope.chartTypes = ['areaspline','spline', 'column', 'area','line'];
    $scope.selectedChartType = $scope.chartTypes[0];
    
    // This is for all plots, change Date axis to local timezone
    Highcharts.setOptions({                                            
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
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%H:%M:%S', this.value);
          }
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
        series: {
          pointStart: 1,
          marker: {
            enabled: true,
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
        seriesArray.push(myData[i]);
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