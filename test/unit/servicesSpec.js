'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('myApp.services'));


  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });

  describe('randomNumberService', function() {
    it('should return a number less than the maximum', inject(function(randomNumberService) {
      expect(randomNumberService.getRandomNumber(0,5)).toBeLessThan(5);
    }));
  });

  describe('randomSuitService', function() {
    it('should return a string', inject(function(randomSuitService) {
      expect(randomSuitService.getRandomSuit()).toBeDefined();
    }));
  });

});
