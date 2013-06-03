'use strict';

angular.module('zeddbApp')
  .controller('ArtistCtrl', function ($scope, $location, $routeParams, Restangular) {
   
	
	$scope.$watch('artistname', function (artistname) {
    if (artistname) {
		$scope.artistName = artistname;
		var artistReleases = Restangular.one("artist", $scope.artistName);
		$scope.artistReleases = artistReleases.getList();
    } 
	});
  
 
  
  });
