'use strict';

angular.module('phonecatApp.phonecatControllers', [])
  .controller('PhoneListCtrl', PhoneListCtrl)
  .controller('PhoneDetailCtrl', PhoneDetailCtrl);

function PhoneListCtrl($http) {
  var vm = this;

  $http.get('phones/phones.json').success(function(data) {
    vm.phones = data;
  });

  vm.orderProp = 'age';

}

function PhoneDetailCtrl($scope, $routeParams, $http) {
  var vm = this;

  $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
      vm.phone = data;
      vm.mainImageUrl = data.images[0];
  });

  vm.setImage = function(imageUrl) {
    vm.mainImageUrl = imageUrl;
  }

}