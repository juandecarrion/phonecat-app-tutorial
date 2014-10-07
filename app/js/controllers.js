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

function PhoneDetailCtrl($routeParams) {
  var vm = this;

  vm.phoneId = $routeParams.phoneId;

}