'use strict';

angular.module('gsnClientApp')
  .service('ChartService', function ($http) {

    this.getDataForChart = function(sensorResult, type) {
      var nValues = sensorResult.header.length-1;
      var allData = {};
      var valueNames = {};
      var myData = [];

      for (var j = 0; j < nValues; j++)
      {
        allData[j] = new Array();
        valueNames[j] = sensorResult.header[j];
      }

      for(var i = sensorResult.tuples.length - 1; i >= 0; --i)
      {
        var data = sensorResult.tuples[i];
        var date = data[sensorResult.header[nValues]].substring(0,10).split("-");
        var time = data[sensorResult.header[nValues]].substring((data[sensorResult.header[nValues]].indexOf("T") + 1),
                                                                (data[sensorResult.header[nValues]].indexOf("T") + 7)).split(":");
        //var time = data[sensorResult.header[nValues]].substring(11,19).split(":");
        //var firstDate = new Date(Date.UTC(date[0], date[1], date[2], time[0], time[1]));
        var firstDate = new Date(date[0], date[1]-1, date[2], time[0], time[1]);

        for (var j = 0; j < nValues; j++)
        {       
          allData[j].push({
            x: firstDate,
            y: parseFloat(data[sensorResult.header[j]])
          })
        };
      }

      for (var j = 0; j < nValues; j++)
      {
        myData.push({
          name: valueNames[j],
          data: allData[j],
          type: type,
          dataLabels: valueNames[j],
          id: valueNames[j],
          tooltip: {
            formatter: function() {
              return '<b>'+ this.series.name +'</b><br/>'+
              Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
              Highcharts.numberFormat(this.y, 2);
            },
          //pointFormat: 'for {series.name} found <b>{point.y:,.0f}</b><br/> samples with throughput of  {point.x}'
          },          
          marker : {
            enabled : true,
            radius : 3
          }
        });
      }

      return myData;
    }

    this.parseGaugeXML = function(xml, fieldName) {
      var nodes = $(xml);
      var results = [];
      var fieldPosition = 0;
      var tuples = 0;
      $(nodes).children().each( // iterate over results
           function (){
              var currentSensor = $(this);
                currentSensor.find("header").children().each(
                  function () {
                    var headerField = $(this);
                    if(headerField == fieldName)
                      return false;
                  }
              );

              currentSensor.find("tuple").each(
                function () {
                    var t = $(this);
                    t.children().each (
                      function(index) {
                        var field = $(this);

                        if(tuples == fieldPosition)
                        {
                          results[0] = field.text();                          
                        }
                        if(tuples == 1)
                        {
                          results[1] = field.text();
                          return false;
                        }
                        tuples++;
                      }
                    );
                    return false;
                });
          });
      return results;
    }
});
