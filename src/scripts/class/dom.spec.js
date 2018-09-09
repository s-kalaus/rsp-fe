/* global expect, Function, spyOn */

import { Dom } from './dom';

describe('Dom', () => {
  let inst;

  beforeEach(() => {
    inst = new Dom();
  });

  it('should exist', function() {
    expect(inst).toEqual(jasmine.any(Object));
  });

  describe('Function: create', () => {
    it('should exist', function() {
      expect(inst.create).toEqual(jasmine.any(Function));
    });
    it('should call document.createElement', function() {
      spyOn(document, 'createElement');
      inst.create('div');
      expect(document.createElement).toHaveBeenCalledWith('div');
    });
  });

  describe('Function: $', () => {
    it('should exist', function() {
      expect(inst.$).toEqual(jasmine.any(Function));
    });
    it('should call document.getElementById', function() {
      spyOn(document, 'getElementById');
      inst.$('id');
      expect(document.getElementById).toHaveBeenCalledWith('id');
    });
  });

  describe('Function: html', () => {
    it('should exist', function() {
      expect(inst.html).toEqual(jasmine.any(Function));
    });
    it('should return if undefined', function() {
      expect(inst.html({innerHTML: 'test'})).toBe('test');
    });
    it('should set if defined', function() {
      const el = {innerHTML: 'test'};
      inst.html(el, 'updated');
      expect(el.innerHTML).toBe('updated');
    });
  });

  describe('Function: css', () => {
    it('should exist', function() {
      expect(inst.css).toEqual(jasmine.any(Function));
    });
    it('should set if defined', function() {
      const el = {style: {test: 1}};
      inst.css(el, {test: 2, other: 3});
      expect(el.style).toEqual({test: 2, other: 3});
    });
  });
});
