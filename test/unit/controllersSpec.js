'use strict';

/* jasmine specs for controllers go here */

describe('PhoneCat controllers', function() {

  describe('PhoneListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(module('phonecatApp.phonecatControllers'));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller('PhoneListCtrl', {$scope: scope})
    }));

    it('should create "phones" model with 3 phones', function() {
      expect(scope.phones).toBeUndefined();
      $httpBackend.flush();

      expect(ctrl.phones).toEqual([{name: 'Nexus S'},
                                    {name: 'Motorola DROID'}]);
    });

    it('should set the default value of orderProp model', function() {
      expect(ctrl.orderProp).toBe('age');
    });

  });
  
  describe('PhoneDetailCtrl', function(){
    
  });
    
});