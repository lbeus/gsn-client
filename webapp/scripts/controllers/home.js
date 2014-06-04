'use strict';

angular.module('gsnClientApp')
  .controller('HomeController', function ($scope, RefreshService, SettingsService) {

   
    $scope.sensors = [];

    $scope.updating = false;

    $scope.selectedTab = [];

  	$scope.intervalOptions = SettingsService.intervalOptions;

  	$scope.interval = SettingsService.refreshInterval;

    // init
    getSensorData();

    // callback functions

    $scope.removeSensor = function(index) {
        $scope.sensors.splice(index,1);
    };

  	$scope.refreshClicked = function() {
        getSensorData();  
    };

    $scope.setRefreshInterval = function() {
      SettingsService.setRefreshInterval($scope.interval);
    };


    //utility functions

    function getSensorData() {
      $scope.updating = true;    
      RefreshService.stopPolling("virtual-sensors");
    
      if($scope.interval.value > 0){
        RefreshService.startPolling("virtual-sensors", SettingsService.refreshInterval.value, function(data) {  
              $scope.updating = false;
              $scope.info = data.info;
              updateSensors(data.sensors);
        });
      }
      else
        $scope.updating = false;
    }


    function updateSensors(data) {

        // add new sensors
        data.forEach(function(entry){
          var name = entry.name;
          var result = $.grep($scope.sensors, function(sensor){ return sensor.name == name; });
          if( result.length == 0 ){
              $scope.sensors.push(entry);
          }
        });  

        //update existing
        $scope.sensors.forEach(function(entry, index){
          var name = entry.name;
          var result = $.grep(data, function(sensor){ return sensor.name == name; });
          
          if( result.length == 1 ){
              var fields = Object.keys(result[0].fields);
             
              fields.forEach(function(field) {
                  
                  $scope.sensors[index].fields[field] = result[0].fields[field];
              });
          }else{
            //$scope.sensors.push(entry); // new sensor added
            $scope.sensors.splice(index,1);
            //console.log(index);
          }
        });
    }
});

