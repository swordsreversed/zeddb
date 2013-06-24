'use strict';

angular.module('zeddbApp', ['ngResource', 'restangular', 'ui.bootstrap', '$strap.directives'])
    .config(function ($routeProvider, $locationProvider, RestangularProvider) {
    $routeProvider
        .when('/releases/:id', {
        templateUrl: 'views/releasedetails.html',
        controller: 'ReleaseDetailCtrl'
    })
        .when('/releases', {
        templateUrl: 'views/release.html',
        controller: 'ReleaseCtrl'
    })
        .when('/releases/new/:name', {
        templateUrl: 'views/releasedetails.html',
        controller: 'ReleaseDetailCtrl'
    })


    .when('/subscribers/', {
        templateUrl: 'views/subscriber.html',
        controller: 'SubscriberCtrl'
    })
        .when('/subscribers/:id', {
        templateUrl: 'views/subdetails.html',
        controller: 'SubdetailsCtrl'
    })
        .when('/subscribers/new/subscriber', {
        templateUrl: 'views/subdetails.html',
        controller: 'SubdetailsCtrl'
    })

    .when('/contacts/', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
    })
        .when('/contacts/:id', {
        templateUrl: 'views/contactdetails.html',
        controller: 'ContactdetailsCtrl'
    })
        .when('/contacts/new/contact', {
        templateUrl: 'views/contactdetails.html',
        controller: 'ContactdetailsCtrl'
    })

    .otherwise({
        redirectTo: '/'
    });

    $locationProvider
        .html5Mode(false);

    RestangularProvider
        .setBaseUrl("http://testdev.4zzzfm.org.au/api/v1");
    RestangularProvider
        .setRestangularFields({
        id: "library_no",
        route: "restangularRoute"
    });
    //RestangularProvider.setListTypeIsArray(false);
})
//end config


//services
.factory('ReleaseService', ['$resource', '$http', '$rootScope', function ($resource) {
        return $resource('http://testdev.4zzzfm.org.au/api/v1/releases/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }])

.factory('GenresService', function ($resource) {
    return $resource('http://zed.dev.192.168.1.102.xip.io/api/v1/genres')
})

.factory('ThemesService', function ($resource) {
    return $resource('http://testdev.4zzzfm.org.au/api/v1/themes')
})

.factory('DepartmentsService', function ($resource) {
    return $resource('http://testdev.4zzzfm.org.au/api/v1/departments')
})

.factory('InterestsService', function ($resource) {
    return $resource('http://testdev.4zzzfm.org.au/api/v1/interests')
})

.factory('SkillsService', function ($resource) {
    return $resource('http://testdev.4zzzfm.org.au/api/v1/skills')
})

.factory('ProgramsService', function ($resource) {
    return $resource('http://testdev.4zzzfm.org.au/api/v1/programs')
})

.factory('SubtypesService', function ($resource) {
    return $resource('http://testdev.4zzzfm.org.au/api/v1/subtypes')
})



.factory('SubService', ['$resource', '$http', '$rootScope', function ($resource) {
        return $resource('http://testdev.4zzzfm.org.au/api/v1/subscribers/:id', {
            id: '@subnumber'
        }, {
            update: {
                method: 'PUT'
            }
        })
    }])

.factory('ContactService', ['$resource', '$http', '$rootScope', function ($resource) {
        return $resource('http://testdev.4zzzfm.org.au/api/v1/contacts/:id', {
            id: '@contact_no'
        }, {
            update: {
                method: 'PUT'
            }
        })


    }])


.factory('SubsBandService', function ($resource) {
    return $resource('http://testdev.4zzzfm.org.au/api/v1/subscribers/band/:name', {
        name: '@subbandname'
    }, {
        update: {
            method: 'PUT'
        }
    })
})


// override the default input to update on blur
.directive('ngBlur', function () {
    return function (scope, elem, attrs) {
        elem.bind('blur', function () {
            scope.$apply(attrs.ngBlur);
        });
    };
})

.directive('ngUppercaseInput', function () {
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



.directive('ngOnBlur', function($parse){
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

.directive('ngModelOnblur', function($parse) {
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