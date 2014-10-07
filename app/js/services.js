'use strict';

angular.module('phonecatApp.phonecatServices', ['ngResource'])
  .factory('PhoneService', PhoneService);

function PhoneService($resource) {
  return $resource('phones/:phoneId.json', {}, {
    query: {
      method:'GET',
      params: {phoneId:'phones'},
      isArray:true
    }
  });
}