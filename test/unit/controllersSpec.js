'use strict';

/* jasmine specs for controllers go here */

describe('PhoneCat controllers', function() {

  beforeEach(module('phonecatApp'));

  describe('PhoneListCtrl', function(){
    var scope, ctrl, $httpBackend;

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
    var scope, $httpBackend, ctrl;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond({name:'phone xyz'});

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(ctrl.phone).toBeUndefined();
      $httpBackend.flush();

      expect(ctrl.phone).toEqual({name:'phone xyz'});
    });

    });
    
});