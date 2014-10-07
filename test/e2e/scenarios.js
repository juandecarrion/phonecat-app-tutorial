'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {
  
  describe('Redirect from Index', function() {
    it('should redirect index.html to index.html#/phones', function() {
      browser.get('app/index.html');
      browser.getLocationAbsUrl().then(function(url) {
          expect(url.split('#')[1]).toBe('/phones');
        });
    });
  });

  describe('Phone list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#phones');
    });

    var phoneList = element.all(by.repeater('phone in vm.phones'));
    var query = element(by.model('query'));
    
    it('should render phone specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('nexus');
      element.all(by.css('.phones li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/phones/nexus-s');
      });
    });

    it('should filter the phone list as a user types into the search box', function() {
      expect(phoneList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(8);
    });
    
     it('should be possible to control phone order via the drop down select box', function() {

       var phoneNameColumn = element.all(by.repeater('phone in vm.phones').column('{{phone.name}}'));
       var query = element(by.model('query'));

       function getNames() {
         return phoneNameColumn.map(function(elm) {
           return elm.getText();
         });
       }

       query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

       expect(getNames()).toEqual([
         "Motorola XOOM\u2122 with Wi-Fi",
         "MOTOROLA XOOM\u2122"
       ]);

       element(by.model('vm.orderProp')).element(by.css('option[value="name"]')).click();

       expect(getNames()).toEqual([
         "MOTOROLA XOOM\u2122",
         "Motorola XOOM\u2122 with Wi-Fi"
       ]);
     });
    
  });
  
  

  describe('Phone detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/phones/nexus-s');
    });
    
    var imageList = element.all(by.repeater('img in vm.phone.images'));


    it('should display nexus-s page', function() {
      expect(element(by.binding('vm.phone.name')).getText()).toBe('Nexus S');
    });


    it('should display 4 images', function() {
      expect(imageList.count()).toBe(4)
    });

  });
  
});