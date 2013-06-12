'use strict';

angular.module('zeddbApp')
  .controller('SubdetailsCtrl', function ($scope, $routeParams, Restangular, SubService, GenresService, ThemesService, SubsBandService, $dialog, $location) {
    
    
    //set vars for constants 
    $scope.alerts = [];
    $scope.gender = [{id: 1, desc: "MALE"}, {id: 2, desc: "FEMALE"}, {id: 3, desc: "TRANS"}];
    $scope.promo = ["Promo Campaign", "Staff Pick", "Other"];
    $scope.format = ["CD", "DIGITAL", "VINYL"];
    $scope.status = ["In Library", "Received", "Culled", "Rejected"];
      
      
    //var _genres = Restangular.all("genres");
    //$scope.genres = _genres.getList();
    
    $scope.sub = SubService.get({id: $routeParams.id}, function(u, getResponseHeaders){
            
            console.log(u);
    });
    $scope.genres = GenresService.query();
    $scope.themes = ThemesService.query();  
    
    
      

     
        
    $scope.saveSubscriber = function() {
        
        
        if ($routeParams.id){
            //update
            console.log('tolo');
            $scope.sub.$update({id: $routeParams.id}, 
            function success(response) {
                if ($scope.alerts.length > 0) {
                $scope.alerts.splice(0, 1);
                }
                $scope.alerts.push({msg: "Subscriber "+$scope.release.library_no+" Updated!"});  
                $scope.sub = SubService.get({id: $routeParams.id});
                
            }, function err() 
            {
                console.log('Couldnt update!');
            });
        } else {
            //insert
            var tempRelease = $scope.release;
            $scope.sub.$save();
            alert("Subscriber added");
            $location.path("/subscribers/"+$scope.sub.sublastname);
        }
    };
    
    
      
    $scope.deleteRelease = function() {
        var title = 'Warning';
        var msg = 'Are you sure you wish to delete this record?';
        var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary'}];
        
        
        $dialog.messageBox(title, msg, btns)
          .open()
          .then(function(result){
            if (result == "ok") { 
                $scope.sub.$delete({id: $routeParams.id},function() {
                    
                    alert("Record deleted");
                    $location.path("/subscribers/"+$scope.sub.sublastname); 
    
                });
            }
        });
    };
    
    
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
      
      
  });

