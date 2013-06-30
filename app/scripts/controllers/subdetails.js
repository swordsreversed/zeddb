'use strict';

app.controller('SubdetailsCtrl', function ($rootScope, $scope, $http, $routeParams, SubService, SkillsService, ProgramsService, SubsBandService, SubtypesService, $dialog, $location, limitToFilter, subscriber) {
    

    
    //set vars for constants 
    $scope.alerts = [];
    $scope.subsuggest = [];
    $scope.gender = [{id: 1, desc: 'MALE'}, {id: 2, desc: 'FEMALE'}, {id: 3, desc: 'TRANS'}];
   
    if ($routeParams.id) {
            $scope.sub = subscriber;
    } else {
            $scope.sub= new SubService();
    }
      
        $scope.suburbsuggest = function (suburbName) {
            return $http.get(apiSrc + '/suburbsuggest/' + suburbName).then(function (response) {
                return limitToFilter(response.data, 15);
                
            });
        };
      
        $scope.postcodesuggest = function (postCode) {
            return $http.get(apiSrc + '/postcodesuggest/' + postCode).then(function (response) {
                return limitToFilter(response.data, 15);
                
            });
        };
      
      
      //$scope.$watch('sub.suburb.suburb', function() { console.log(sub.suburb.suburb); });  
     
      $scope.skills = SkillsService.query();
      $scope.programs = ProgramsService.query();
      $scope.subtypes = SubtypesService.query();
      
      
      
      $scope.subCheck = function (last, first) {
             $http.get(apiSrc + '/subsuggesta/' + last + '/' + first).then(function (response) {
                $scope.subsuggest = limitToFilter(response.data, 15);
            });
        };
      
      $scope.saveSubscriber = function() {
        
       if ($scope.subForm.$valid === true) {  
        if ($routeParams.id){
            //update
            delete $scope.sub.suburb; // delete suburb object
            $scope.sub.$update({id: $routeParams.id},
            function success(response) {
                if ($scope.alerts.length > 0) {
                $scope.alerts.splice(0, 1);
                }
                $scope.alerts.push({msg: 'Subscriber '+$scope.sub.subnumber+' Updated!'});
                $scope.sub = SubService.get({id: $routeParams.id});
                
            }, function err() {
                console.log('Couldnt update!');
            });
        } else {
            //insert
            delete $scope.sub.suburb;
            console.log($scope.sub);
            $scope.sub.$save();
            alert('Subscriber added.');
            $location.path('/subscribers/');
        }
       }
    };
    
    
      
    $scope.deleteSubscriber = function() {
        var title = 'Warning';
        var msg = 'Are you sure you wish to delete this record?';
        var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary'}];
        
        
        $dialog.messageBox(title, msg, btns)
          .open()
          .then(function(result){
            if (result === 'ok') {
                $scope.sub.$delete({id: $routeParams.id},function() {
                    $rootScope.subscriberParams = {};
                    alert('Record deleted.');
                    $location.path('/subscribers/');
    
                });
            }
        });
    };
    
    
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
      
      
    $scope.onSuburbChange = function ($item, $model, $label) {
            
          //item = suburb object, model = val (id), label = name
          $scope.sub.suburbid = $item.suburbid;
          $scope.sub.suburb.postcode = $item.postcode;
          $scope.sub.suburb.state = $item.state;
    };
      
    $scope.upDate = function() {

        var fdate = new Date($scope.sub.paymentdate); 
        fdate.setDate($scope.sub.paymentdate.getDate() + 365);
        $scope.sub.expirydate =  fdate;
    } 
    
  });