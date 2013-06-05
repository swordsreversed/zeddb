'use strict';

angular.module('zeddbApp')
  .controller('ArtistCtrl', function ($scope, $http, $location, $routeParams, Restangular, limitToFilter) {
    
		
	$scope.getReleases = function(){
        
        var artistReleases = Restangular.one("artist", $scope.artistname);
		$scope.artistReleases = limitToFilter(artistReleases.getList(), 15);
    };
    
	 $scope.artists = function(artistName) {
		return $http.get("http://db.4zzzfm.org.au/api/artistsuggest/"+artistName).then(function(response){
      return limitToFilter(response.data, 15);
    });
	};
  
  
  });
