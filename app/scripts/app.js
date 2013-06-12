'use strict';

angular.module('zeddbApp', ['ngResource', 'restangular', 'ui.bootstrap'])
  .config(function ($routeProvider, $locationProvider, RestangularProvider) {
    $routeProvider
      .when('/releases/:id', {
        templateUrl: 'views/releasedetail.html',
        controller: 'ReleaseDetailCtrl'
      })
      .when('/releases', {
        templateUrl: 'views/release.html',
        controller: 'ReleaseCtrl'
      })
    .when('/releases/new/:name', {
        templateUrl: 'views/release.html',
        controller: 'ReleaseCtrl'
      })
      
      .when('/subscriber/:name', {
        templateUrl: 'views/subscriber.html',
        controller: 'SubscriberCtrl'
      })
     .when('/subscriber/', {
        templateUrl: 'views/subscriber.html',
        controller: 'SubscriberCtrl'
      })
    .when('/subdetails/:id', {
        templateUrl: 'views/subdetails.html',
        controller: 'SubdetailsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider
        .html5Mode(false);  
      
	RestangularProvider
        .setBaseUrl("http://db.4zzzfm.org.au/api/v1");
    RestangularProvider
        .setRestangularFields({
            id: "library_no",
            route: "restangularRoute"
        });
      //RestangularProvider.setListTypeIsArray(false);
  })
 //end config
.factory('ReleaseService', ['$resource', '$http', '$rootScope', function($resource) {
    return $resource('http://db.4zzzfm.org.au/api/v1/releases/:id', {id: '@id'}, {update: {method: 'PUT'}})
}])

.factory('GenresService', function($resource) {
    return $resource('http://db.4zzzfm.org.au/api/v1/genres')
})

.factory('ThemesService', function($resource) {
    return $resource('http://db.4zzzfm.org.au/api/v1/themes')
})

.factory('SubService', ['$resource', '$http', '$rootScope', function($resource) {
    return $resource('http://db.4zzzfm.org.au/api/v1/subscriber/:id', {id: '@subnumber'}, {update: {method: 'PUT'}})
}])

.factory('SubsBandService', function($resource) {
    return $resource('http://db.4zzzfm.org.au/api/v1/subscribers/band/:name', {name: '@subbandname'}, {update: {method: 'PUT'}})
})


 // override the default input to update on blur
.directive('ngBlur', function () {
    return function (scope, elem, attrs) {
        elem.bind('blur', function () {
            scope.$apply(attrs.ngBlur);
        });
    };
})

.directive('ngUppercaseInput', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function($viewValue) {
           var capitalized = $viewValue.toUpperCase();
           if(capitalized !== $viewValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }         
            return capitalized;
         }
         modelCtrl.$parsers.push(capitalize);
         capitalize(scope[attrs.ngModel]);  // capitalize initial value
     }
   };
});



