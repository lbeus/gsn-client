'use strict';

angular.module('gsnClientApp')
  .controller('RelayController', function ($http, $scope, RelayService ) {

  	$scope.relays = [
  			{'displayName': "Letva", 'id': 0, 'status' : true},
  			{'displayName': "Zarulja", 'id': 16, 'status' : false},
  	];


    RelayService.getConfig(function (config) {
      $scope.config = config;

      console.log($scope.config.relays[0].id);
    });


  	$scope.relayChange = function(index) {

  		var request = {name : $scope.relays[index].displayName, action : $scope.relays[index].status === true ? "ON" : "OFF" };
  		
  		$http({
              method: 'POST',
              url: '/relay/command',
              data: request,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
                     console.log(data);  
        }).error(function(error){
               
    	});	
  	};

    $scope.updateConfig = function() {

      var request = {'ip-address': $scope.config.connectionParams['ip-address'], 
                     'local-port': $scope.config.connectionParams['local-port'],
                     'remote-port' : $scope.config.connectionParams['remote-port']
      }

      $http({
              method: 'POST',
              url: '/relay/config-update',
              data: request,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
                     console.log(data);  
        }).error(function(error){
               
      }); 
    };




    $scope.relayAdd = function() {
      $scope.config.relays.push({displayname:"", id:""});
    };

    $scope.relayRemove = function(index) {

      $scope.config.relays.splice(index,1);
    
    };
 });