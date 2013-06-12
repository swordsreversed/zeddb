'use strict';

describe('Controller: SubdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('zeddbApp'));

  var SubdetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubdetailsCtrl = $controller('SubdetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
