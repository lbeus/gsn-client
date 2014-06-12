'use strict';

angular.module('gsnClientApp')
  .controller('HomeController', function ($scope, RefreshService, SettingsService) {


    $scope.gridsterOpts = {
       /* columns: 4, // the width of the grid, in columns
        width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        //rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [5, 5], // the pixel distance between each widget
        isMobile: false, // stacks the grid items if true
        minColumns: 1, // the minimum columns the grid must have
        minRows: 1, // the minimum height of the grid, in rows
        maxRows: 100,/*/
        defaultSizeX: 2, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        rowHeight:115,
        width:'auto',
        margins:[0,5],
        minColumns: 3,
        avoidOverlappedWidgets:true,
        isMobile: true,
        //mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
        resizable: {
           enabled: true,
           start: function(event, uiWidget, $element) {}, // optional callback fired when resize is started,
           resize: function(event, uiWidget, $element) {}, // optional callback fired when item is resized,
           stop: function(event, uiWidget, $element) {} // optional callback fired when item is finished resizing
        },
        draggable: {
           enabled: true, // whether dragging items is supported
           //handle: '', // optional selector for resize handle
           start: function(event, uiWidget, $element) {}, // optional callback fired when drag is started,
           drag: function(event, uiWidget, $element) {}, // optional callback fired when item is moved,
           stop: function(event, uiWidget, $element) {} // optional callback fired when item is finished dragging
        }
    };

    /*
    $scope.customItemMap = {
        sizeX: 'sensor.size.x',
        sizeY: 'sensor.size.y',
        row: 'sensor.position[0]',
        col: 'sensor.position[1]'
    };*/

   
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

