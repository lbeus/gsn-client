'use strict';

var routeProviderReference;

var app = angular.module('gsnClientApp', [
  //'ngAnimate',
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
  'multi-select',
  'highcharts-ng'
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
      .when ( '/electricity', {
          templateUrl: 'views/electricity.html',
          controller: 'DataController'
      })
     /* .when('/passiveHeating', {
        templateUrl: 'views/passiveHeating.html',
        controller: 'PassiveHeatingController'
      })
      .when('/relay', {
        templateUrl: 'views/relay.html',
        controller: 'RelayController'
      })*/
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
	  /*.when('/adminMain', {
		    templateUrl: 'views/adminMain.html',
		    controller: 'AdminMainCtrl'
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
