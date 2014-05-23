'use strict';

var app = angular.module('gsnClientApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'google-maps',
  'ui.date',
  'ngQuickDate',
  'ngGrid',
  'NgSwitchery'
]);


app.config(function ($routeProvider, $httpProvider) {
   $routeProvider.
      when ('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeController'
      })
      .when ('/home', {
          templateUrl: 'views/home.html',
          controller: 'HomeController'
      })
      .when('/data', {
        templateUrl: 'views/data.html',
        controller: 'DataController'
      })
      .when ( '/map', {
          templateUrl: 'views/map.html',
          controller: 'MapController'
      })
      .when('/passiveHeating', {
        templateUrl: 'views/passiveHeating.html',
        controller: 'PassiveHeatingController'
      })
      .when('/relay', {
        templateUrl: 'views/relay.html',
        controller: 'RelayController'
      })
      .otherwise({
        redirectTo: '/'
      });
  
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };

    /*$httpProvider.responseInterceptors.push('myHttpInterceptor');

    var spinnerFunction = function spinnerFunction(data, headersGetter) {
      $("#spinner").show();
      console.log('prikazi spinner');
      return data;
    };

    $httpProvider.defaults.transformRequest.push(spinnerFunction);*/
  });

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



app.run(function($rootScope, $location, NavigationService) {

    $rootScope.$on('$routeChangeStart', function(next, current) { 

         NavigationService.pageChanged($location.path());
    
    });
});

$(document).foundation();
