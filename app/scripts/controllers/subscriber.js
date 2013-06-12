'use strict';

angular.module('zeddbApp')
    .controller('SubscriberCtrl', function ($scope, $http, $location, $routeParams, Restangular, limitToFilter) {
        
        
        $scope.subsuggest = function (subsearchname) {
            return $http.get("http://db.4zzzfm.org.au/api/v1/subsuggest/" + subsearchname).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
        
        
        //set order of display
        
        if ($routeParams.name){
            $scope.predicate = 'subnumber';
        
            $scope.subname = $routeParams.name;
            var subq = Restangular.one("subscribers", $scope.subname);
            $scope.subscribers = subq.getList();
        }
        
        
		
        //add new
         $scope.add = function() {
             $location.path('/subdetails/add');
        };
         
        $scope.search = function() {
            $location.path('/subscriber/'+$scope.subsearchname);
        };
  
    });
