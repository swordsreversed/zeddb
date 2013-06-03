'use strict';

angular.module('zeddbApp', ['restangular'])
  .config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl'
      })
      .when('/artist/:name', {
        templateUrl: 'views/artist.html',
        controller: 'ArtistCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
	RestangularProvider
      .setBaseUrl("http://db.4zzzfm.org.au/api");
      RestangularProvider.setRestangularFields({
      id: "library_no",
      route: "restangularRoute"
    });
    
  });
 


    
