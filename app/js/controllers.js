'use strict';

angular.module('phonecatApp.phonecatControllers', [])
  .controller('PhoneListCtrl', PhoneListCtrl)
  .controller('PhoneDetailCtrl', PhoneDetailCtrl);

function PhoneListCtrl($http, PhoneService) {
  var vm = this;

  vm.phones = PhoneService.query();
  vm.orderProp = 'age';

}

function PhoneDetailCtrl($scope, $routeParams, $http, PhoneService) {
  var vm = this;

  vm.phone = PhoneService.get({phoneId: $routeParams.phoneId}, function(phone) {
    vm.mainImageUrl = phone.images[0];
  }); 

  vm.setImage = function(imageUrl) {
    vm.mainImageUrl = imageUrl;
  }

}