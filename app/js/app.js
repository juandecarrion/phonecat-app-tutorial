'use strict';

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatApp.phonecatControllers'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl',
        controllerAs: 'vm'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl',
        controllerAs: 'vm'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);