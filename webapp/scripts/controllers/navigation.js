'use strict';

angular.module('gsnClientApp')
  .controller('NavigationController', function ($scope, NavigationService,VirtualSensorService) {
		
		$scope.pages = NavigationService.pages;

		VirtualSensorService.get(function(data){
			$scope.info = data.info;
		});   

  });
