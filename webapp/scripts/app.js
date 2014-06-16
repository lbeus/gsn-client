'use strict';

var $routeProviderReference;

var app = angular.module('gsnClientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'google-maps',
  'ui.date',
  'ngQuickDate',
  'ngGrid',
  'NgSwitchery',
  'gridster',
  'multi-select'
]);


app.config(function ($routeProvider, $httpProvider) {
   $routeProviderReference = $routeProvider;

   $routeProvider.
      when ('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeController'
      })
      .when('/home', {
          templateUrl: 'views/home.html',
          controller: 'HomeController'
      })
     .when('/data', {
        templateUrl: 'views/data.html',
        controller: 'DataController'
      })
      .when ('/map', {
          templateUrl: 'views/map.html',
          controller: 'MapController'
      })
      /*.when('/passiveHeating', {
        templateUrl: 'views/passiveHeating.html',
        controller: 'PassiveHeatingController'
      })
      .when('/relay', {
        templateUrl: 'views/relay.html',
        controller: 'RelayController'
      })
      .when('/ipcamera', {
        templateUrl: 'views/ipCamera.html',
        controller: 'IPCamera'
      })*/
      .otherwise({
        redirectTo: '/'
      });
  
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
  });

/*
app.factory('myHttpInterceptor', function ($q, $window) {
  return function (promise) {
    return promise.then(function (response) {
      console.log('makni spinner');
      $("#spinner").hide();
      return response;
    }, function (response) {
      console.log('makni spinner');
      $("#spinner").hide();
      return $q.reject(response);
    });
  };
});
*/


app.run(function($rootScope, $location,$http,$route, NavigationService) {

  $http.get('/routes').success(function (data) {   
    var j = 0,
      currentRoute;
    for ( ; j < data.length; j++ ) {
      currentRoute = data[j];
      $routeProviderReference.when(currentRoute.name, {
        templateUrl: currentRoute.templateUrl,
        controller: currentRoute.controller
      });

      NavigationService.addPage(
        {
          pageName:currentRoute.pageName, 
          url:currentRoute.url, 
          active:currentRoute.active
        }
      );
    }
    $route.reload();

  });

    $rootScope.$on('$routeChangeStart', function(next, current) { 
         NavigationService.pageChanged($location.path());
    });
});

$(document).foundation();
