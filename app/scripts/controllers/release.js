'use strict';

angular.module('zeddbApp')
    .controller('ReleaseCtrl', function ($scope, $http, $location, $routeParams, ReleaseService, SubsBandService, Restangular, limitToFilter) {
        
        $scope.artists = function (artistName) {
            return $http.get("http://db.4zzzfm.org.au/api/v1/artistsuggest/" + artistName).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
        
        $scope.titles = function (title) {
            return $http.get("http://db.4zzzfm.org.au/api/v1/titlesuggest/" + title).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
        
       // search with qstring - return LIST of results from resource
        
        console.log($routeParams);
        //set order of display
        
        
            
            //var artistReleases = Restangular.one("artist", $scope.artistname);
            //$scope.artistReleases = artistReleases.getList();
            
        $scope.clearForm = function() {
            $scope.artistName = "";
            $scope.title = "";
            $scope.releaseSearchForm.$setPristine();
        }
        
        
		
        //add new
         $scope.add = function() {
             $location.path('/releases/new/'+$scope.artistname);
        };
         
        $scope.search = function() {
            console.log($scope.artistName)
            var $params = [{artist_nm: $scope.artistName}, {title: $scope.title}];
            $scope.release = ReleaseService.get($params, function(u, getResponseHeaders){
                $scope.subscriber = SubsBandService.get({name: u.artist_nm});
                    $scope.predicate = 'release_year';
                    $scope.artistname = $routeParams.name;
            });
        };
  
    });
