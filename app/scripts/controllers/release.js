'use strict';

app.controller('ReleaseCtrl', function ($rootScope, $scope, $http, $location, $routeParams, ReleaseService, GenresService, ThemesService, limitToFilter, $filter) {
        
        
        
        $scope.releaseSearchFormData = {};
        
        if ($rootScope.releaseParams) {
            $scope.releases = ReleaseService.query($rootScope.releaseParams, function () {
                        //set order of display
                    $scope.predicate = 'release_year';
                    $scope.releaseSearchFormData = $rootScope.releaseParams;
                    //delete $rootScope.releaseParams;
                });
        }
        
        $scope.ausnz = ["A", "NZ"];
        $scope.format = ["CD", "DIGITAL", "VINYL"];
        $scope.extendedFormats = [ 
            {format_srch: 'CD', format_desc: 'CD'}, 
            {format_srch: 'DIGITAL', format_desc: 'DIGITAL'}, 
            {format_srch: 'LP', format_desc: 'VINYL LP'}, 
            {format_srch: '7"', format_desc: 'VINYL 7"'} 
        ];
        
        
        
        $scope.genres = GenresService.query();
        $scope.themes = ThemesService.query();

        $scope.artists = function (artistName) {
            return $http.get('http://zed.dev/api/v1/artistsuggest/' + artistName).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
    
        $scope.titles = function (title) {
            return $http.get('http://zed.dev/api/v1/titlesuggest/' + title).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };

        //var artistReleases = Restangular.one("artist", $scope.artistname);
        //$scope.artistReleases = artistReleases.getList();
    
        $scope.search = function () {
    
            if ($scope.releaseSearchForm.$dirty === true) {
                var params = $scope.releaseSearchFormData;
                // search with qstring - return LIST of results from resource
                $scope.releases = ReleaseService.query(params, function (u, getResponseHeaders) {
    
                    //set order of display
                    $scope.predicate = 'release_year';
                    $scope.artistname = $routeParams.name;
                    $rootScope.releaseParams = params;
                
                });
            } else {
                console.log('no search shit!');
    
            }
        };


        $scope.clearForm = function () {
            $scope.releaseSearchFormData = {};
            $scope.releaseSearchFormData.title = '';
            $scope.releaseSearchFormData.artist_nm = '';
           
            $scope.releaseSearchForm.$setPristine();
            delete $rootScope.releaseParams;
            $scope.releases = {};
        };
    
    
        //add new
        $scope.add = function () {
            if ($scope.releaseSearchFormData.artist_nm) {
                $location.path('/releases/new/' + $scope.releaseSearchFormData.artist_nm);
            } else {
                $location.path('/releases/new/release');
            }
        };
        
        $scope.convertDate = function (date) {
            console.log(date);
            $scope.cDate = $filter('date')(new Date(date), 'y-MM-dd');
        }; 
    });