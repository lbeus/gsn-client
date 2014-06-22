'use strict';

angular.module('gsnClientApp')
  .service('GaugeService', function ($http) {
    return {
      async:function(sensorName, sensorField) {
        return $http.get('http://localhost:22001/multidata?vs[0]=' + sensorName + '&field[0]=' + sensorField + '&download_format=xml');
      }
    }
});