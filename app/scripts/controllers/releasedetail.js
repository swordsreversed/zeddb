'use strict';

angular.module('zeddbApp')
    .controller('ReleaseDetailCtrl', function ($rootScope, $scope, $routeParams, Restangular, ReleaseService, GenresService, ThemesService, SubsBandService, $dialog, $location) {


    
        
    //set vars for constants 
    $scope.alerts = [];
    $scope.ausnz = ['A', 'NZ'];
    $scope.promo = ['Promo Campaign', 'Staff Pick', 'Other'];
    $scope.format = ['CD', 'DIGITAL', 'VINYL'];
    $scope.status = ['In Library', 'Received', 'Culled', 'Rejected'];

    $scope.genres = GenresService.query();
    $scope.themes = ThemesService.query();
    //var _genres = Restangular.all("genres");
    //$scope.genres = _genres.getList();

    if ($routeParams.id) {
      $scope.release = ReleaseService.get({ id: $routeParams.id }, function (u, getResponseHeaders) {
          $scope.subscriber = SubsBandService.get({ name: u.artist_nm});
        });
        
        
        /* $scope.releaseO = ReleaseService.get({id: $routeParams.id}).$then(
           function(res) {
            $scope.release = res.data;
            $scope.subscriber = SubsBandService.get({name: res.data.artist_nm });
               
           }  
        ); */

    } else {
      $scope.release= new ReleaseService();
    }

    if ($routeParams.name) {
        
      $scope.release.artist_nm = $routeParams.name;

    }


    $scope.saveRelease = function () {


        if ($routeParams.id) {
            //update

          $scope.release.$update({
            id: $routeParams.id
          }, function success(response) {
                if ($scope.alerts.length > 0) {
                  $scope.alerts.splice(0, 1);
                }
                $scope.alerts.push({ msg: 'Record ' + $scope.release.library_no + ' Updated!'});
                $scope.release = ReleaseService.get({id: $routeParams.id});
                //$scope.release = new ReleaseService(response.data);

              }, function err() {
                alert('Couldnt update!');
              });
        } else {
            //insert
          var tempRelease = $scope.release;
          $scope.release.$save(function () {
                alert('Record added');
                $location.path('/releases');
              });

        }
      };



    $scope.deleteRelease = function () {
        var title = 'Warning';
        var msg = 'Are you sure you wish to delete this record?';
        var btns = [{
          result: 'cancel',
          label: 'Cancel'
        }, {
          result: 'ok',
          label: 'OK',
          cssClass: 'btn-primary'
        }];


        $dialog.messageBox(title, msg, btns)
            .open()
            .then(function (result) {
            if (result === 'ok') {
              $scope.release.$delete({
                id: $routeParams.id
              }, function () {

                alert('Record deleted');
                $location.path('/releases');

              });
            }
          });
      };


    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
      };

    $scope.add = function () {
            if ($scope.release.artist_nm) {
              $location.path('/releases/new/' + $scope.release.artist_nm);
            } else {
              $location.path('/releases/new/release');
            }
          };
        
        
        
  });