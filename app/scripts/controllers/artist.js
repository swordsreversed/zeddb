'use strict';

angular.module('zeddbApp')
  .controller('ArtistCtrl', function ($scope, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.artistName = $routeParams.name;
    $scope.artistReleases = [{name:'Sonic Death', year:'1981'},{name:'Daydream Nation',year:'1988'},{name:'Washing Machine',year:'1995'}, {name:'Murray St',year:'2002'}];

  });
