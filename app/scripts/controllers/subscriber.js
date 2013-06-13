'use strict';

angular.module('zeddbApp')
    .controller('SubscriberCtrl', function ($scope, $http, $location, $routeParams, Restangular, SubService, limitToFilter) {
        
        $scope.subscriberSearchFormData={};
        
        $scope.subsuggest = function (subName) {
            return $http.get("http://db.4zzzfm.org.au/api/v1/subsuggest/" + subName).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
        
        
        $scope.search = function() {
            
            if ($scope.subscriberSearchForm.$dirty == true) {
                var $params = $scope.subscriberSearchFormData;
                // search with qstring - return LIST of results from resource
                $scope.subscribers = SubService.query($params, function(u, getResponseHeaders){
                
                    //set order of display
                    $scope.predicate = 'createddate';
                   
                });
            } else {
                console.log('no search shit!');
            
            }
        };
        
        
         $scope.clearForm = function() {
            $scope.subscriberSearchFormData.subName = "";

            $scope.subscriberSearchForm.$setPristine();
            console.log($scope.subscriberSearchFormData.cont_female);
        };
  
    });
