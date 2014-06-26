'use strict';

var routeProviderReference;

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

   routeProviderReference = $routeProvider;

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
	  .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
	  .when('/desc', {
        templateUrl: 'views/modifyDesc.html',
        controller: 'ModifyController'
      })
	  .when('/config', {
        templateUrl: 'views/config.html',
        controller: 'ConfigController'
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
  });



app.run(function($rootScope, $location, $http, NavigationService) {
    $http.get('/routes').success(function(data){
        for(var i=0; i<data.length;++i){
          routeProviderReference.when(data[i].name,{
              templateUrl: data[i].templateUrl,
              controller: data[i].controller
            }
          );
          NavigationService.addPage({
              pageName: data[i].pageName,
              url:data[i].url,
              active:data[i].active
          });
        }
    });
    $rootScope.$on('$routeChangeStart', function(next, current) { 
         NavigationService.pageChanged($location.path());
    });
});

$(document).foundation();
