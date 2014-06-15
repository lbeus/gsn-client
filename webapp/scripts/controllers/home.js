'use strict';

angular.module('gsnClientApp')
  .controller('HomeController', function ($scope, RefreshService, SettingsService,$window) {

    $scope.gridsterOpts = {
        defaultSizeX: 2,
        defaultSizeY: 1,
        rowHeight:130,
        colWidth:155,
        width:'auto',
        margins:[5,5],
        minColumns: 1,
        avoidOverlappedWidgets:true,
        columns:Math.floor($window.innerWidth/155),
        resizable: {
           enabled: false
        },
        draggable: {
           enabled: true
        }
    };

    $scope.updating = false;

    $scope.selectedTab = [];

  	$scope.intervalOptions = SettingsService.intervalOptions;

  	$scope.interval = SettingsService.refreshInterval;

    $scope.sensors = SettingsService.sensors;

    // init
    getSensorData();

    // callback functions
    $scope.removeSensor = function(index) {
      for(var i=0; i < $scope.sensors.length;++i){
        if($scope.visibleSensors[index].name == $scope.sensors[i].name){
          $scope.sensors[i].visible = false;
          $scope.visibleSensors.splice(index,1);
          break;
        }
      }
    };

  	$scope.refreshClicked = function() {
        SettingsService.setVisibleSensors($scope.visibleSensors);
        SettingsService.setSensors($scope.sensors);      
        getSensorData();  
    };

    $scope.setRefreshInterval = function() {
      SettingsService.setRefreshInterval($scope.interval);
    };


    //utility functions
    function getSensorData() {
      
      $scope.updating = true;    
      RefreshService.stopPolling("virtual-sensors");
    
      if($scope.interval.value > 0) {

        RefreshService.startPolling("virtual-sensors", SettingsService.refreshInterval.value, function(data) {  
              $scope.updating = false;
              $scope.info = data.info;
              //$scope.sensors = removeHidden(data.sensors);
              updateSensors(data.sensors);
              removeHidden($scope.sensors);
        });
      }
      else
        $scope.updating = false;
    }

    $scope.$on("$destroy", function() {
        SettingsService.setVisibleSensors($scope.visibleSensors);  
        SettingsService.setSensors($scope.sensors);   
    });

    function removeHidden(data){
      
      if(SettingsService.initialLoad == false){
            data.forEach(function(entry){
              var name = entry.name;
              var result = $.grep($scope.visibleSensors, function(sensor){ return sensor.name == name; });
              if( result.length == 0 ) {
                entry.visible = false;
              }
            });
      } else {
        SettingsService.setInitialLoad(false);
      }
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
          }else {
            $scope.sensors.splice(index,1);
          }
        });
    }
});

