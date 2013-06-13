'use strict';

angular.module('zeddbApp')
    .controller('ReleaseCtrl', function ($scope, $http, $location, $routeParams, ReleaseService, Restangular, limitToFilter) {
        
      
        $scope.releaseSearchFormData={};
        
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
          
            //var artistReleases = Restangular.one("artist", $scope.artistname);
            //$scope.artistReleases = artistReleases.getList();

        $scope.search = function() {
            
            if ($scope.releaseSearchForm.$dirty == true) {
                var $params = $scope.releaseSearchFormData;
                // search with qstring - return LIST of results from resource
                $scope.releases = ReleaseService.query($params, function(u, getResponseHeaders){
                
                    //set order of display
                    $scope.predicate = 'release_year';
                    $scope.artistname = $routeParams.name;
                });
            } else {
                console.log('no search shit!');
            
            }
        };
        
        
         $scope.clearForm = function() {
            $scope.releaseSearchFormData.artist_nm = "";
            $scope.releaseSearchFormData.title = "";
            $scope.releaseSearchFormData.cont_female = 0;
            $scope.releaseSearchForm.$setPristine();
            console.log($scope.releaseSearchFormData.cont_female);
        };
        
		
        //add new
         $scope.add = function() {
             $location.path('/releases/new/'+$scope.artistname);
        };
         
});
