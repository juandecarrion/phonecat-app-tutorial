'use strict';

/* jasmine specs for controllers go here */

describe('PhoneCat controllers', function() {

  beforeEach(module('phonecatApp'));
  beforeEach(module('phonecatApp.phonecatServices'));

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('PhoneListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller('PhoneListCtrl', {$scope: scope})
    }));

    it('should create "phones" model with 2 phones fetched from xhr', function() {
      expect(ctrl.phones).toEqualData([]);
      $httpBackend.flush();

      expect(ctrl.phones).toEqualData([{name: 'Nexus S'},
                                    {name: 'Motorola DROID'}]);
    });

    it('should set the default value of orderProp model', function() {
      expect(ctrl.orderProp).toBe('age');
    });

  });
  
  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl;
    
    var xyzPhoneData = {
      name: 'phone xyz',
      images: ['image/url1.png', 'image/url2.png']
    };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData);

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(ctrl.phone).toEqualData({});
      $httpBackend.flush();

      expect(ctrl.phone).toEqualData({
        name: 'phone xyz',
        images: ['image/url1.png', 'image/url2.png']
      });
    });

    });
    
});