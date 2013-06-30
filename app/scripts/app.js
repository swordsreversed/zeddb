'use strict';

var apiSrc = 'http://zed.dev/api/v1';

var app = angular.module('zeddbApp', ['ngResource', 'ui.bootstrap', '$strap.directives'])
    .config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/releases/:id', {
        templateUrl: 'views/releasedetails.html',
        controller: 'ReleaseDetailCtrl',
        resolve: {
          release : function(ReleaseService, $route) {
            return ReleaseService.get({id: $route.current.params.id});
          }
        }
    })
        .when('/releases', {
        templateUrl: 'views/release.html',
        controller: 'ReleaseCtrl'
    })
        .when('/releases/new/release', {
        templateUrl: 'views/releasedetails.html',
        controller: 'ReleaseDetailCtrl',
        resolve: { release: function() { return {}; }}
    })
        .when('/subscribers/', {
        templateUrl: 'views/subscriber.html',
        controller: 'SubscriberCtrl'
    })
        .when('/subscribers/:id', {
        templateUrl: 'views/subdetails.html',
        controller: 'SubdetailsCtrl',
        resolve: {
          subscriber : function(SubService, $route) {
            return SubService.get({id: $route.current.params.id});
          }
        }
    })
        .when('/subscribers/new/subscriber', {
        templateUrl: 'views/subdetails.html',
        controller: 'SubdetailsCtrl',
        resolve: { subscriber: function() { return {}; }}
    })
        .when('/contacts/', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        
    })
    .when('/contacts/:id', {
        templateUrl: 'views/contactdetails.html',
        controller: 'ContactdetailsCtrl',
        resolve: {
          contact : function(ContactService, $route) {
            return ContactService.get({id: $route.current.params.id});
          }
        }
    })
        .when('/contacts/new/contact', {
        templateUrl: 'views/contactdetails.html',
        controller: 'ContactdetailsCtrl',
        resolve: { contact: function() { return {}; }} 
    })

    .otherwise({
        redirectTo: '/'
    });

    $locationProvider
        .html5Mode(false);

   
    //RestangularProvider.setListTypeIsArray(false);
})
//end config


//services


app.factory('GenresService', function ($resource) {
    return $resource(apiSrc + '/genres')
})

app.factory('ThemesService', function ($resource) {
    return $resource(apiSrc + '/themes')
})

app.factory('DepartmentsService', function ($resource) {
    return $resource(apiSrc + '/departments')
})

app.factory('InterestsService', function ($resource) {
    return $resource(apiSrc + '/interests')
})

app.factory('SkillsService', function ($resource) {
    return $resource(apiSrc + '/skills')
})

app.factory('ProgramsService', function ($resource) {
    return $resource(apiSrc + '/programs')
})

app.factory('SubtypesService', function ($resource) {
    return $resource(apiSrc + '/subtypes')
})

app.factory('ReleaseService', ['$resource', '$http', '$rootScope', function ($resource) {
        return $resource(apiSrc + '/releases/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }])

app.factory('SubService', ['$resource', '$http', '$rootScope', function ($resource) {
        return $resource(apiSrc + '/subscribers/:id', {
            id: '@subnumber'
        }, {
            update: {
                method: 'PUT'
            }
        })
    }])

app.factory('ContactService', ['$resource', '$http', '$rootScope', function ($resource) {
        return $resource(apiSrc + '/contacts/:id', {
            id: '@contact_no'
        }, {
            update: {
                method: 'PUT'
            }
        })


    }])





app.factory('SubsBandService', function ($resource) {
    return $resource(apiSrc + 'subscribers/band/:name', {
        name: '@subbandname'
    }, {
        update: {
            method: 'PUT'
        }
    })
})


// override the default input to update on blur
app.directive('ngBlur', function () {
    return function (scope, elem, attrs) {
        elem.bind('blur', function () {
            scope.$apply(attrs.ngBlur);
        });
    };
})

app.directive('ngUppercaseInput', function () {
    return {

        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function ($viewValue) {
                if ($viewValue) {
                    var capitalized = $viewValue.toUpperCase();
                    if (capitalized !== $viewValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }

            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
})



app.directive('ngOnBlur', function($parse){
         return {

        require: 'ngModel',
        link:  function(scope, elm, attrs){       
                var onBlurFunction = $parse(attrs['ngOnBlur']);
                elm.bind("blur", function(event) {
                    scope.$apply(function() {
                        onBlurFunction(scope, { $event: event });
                    })});
        }   
        }
})

app.directive('ngModelOnblur', function($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ngModelCtrl) {
            if (attrs.type === 'radio' || attrs.type === 'checkbox') return;
            
            elm.unbind('input').unbind('keydown').unbind('change');
            var onBlurFunction = $parse(attrs['ngModelOnblur']);
            elm.bind('blur', function() {
                scope.$apply(function() {
                    onBlurFunction(scope, { $event: event });
                });         
            });
        }
    };
});
