'use strict';

angular.module('zeddbApp')
  .controller('MainCtrl', function ($scope, $http, $location, limitToFilter) {
    
         
      
        $scope.search = function() {
            $location.path('/releases');
        };
      
        $scope.isCollapsed = true;
       
  });
