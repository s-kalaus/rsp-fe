/* global expect, Function, spyOn */

import { Step } from './step';

describe('Step', () => {
  let main;
  let inst;

  beforeEach(() => {
    main = {test: 1};
    inst = new Step(main);
  });

  it('should exist', function() {
    expect(inst).toEqual(jasmine.any(Object));
    expect(inst.main).toEqual(main);
  });

  describe('Function: activate', () => {
    it('should exist', function() {
      expect(inst.activate).toEqual(jasmine.any(Function));
    });
    it('should call iElement.classList.remove', function() {
      inst.init = jasmine.createSpy('init');
      inst.iElement = {classList: {remove: jasmine.createSpy('remove')}};
      inst.activate();
      expect(inst.iElement.classList.remove).toHaveBeenCalledWith('d-none');
      expect(inst.init).toHaveBeenCalledWith();
    });
  });

  describe('Function: deactivate', () => {
    it('should exist', function() {
      expect(inst.deactivate).toEqual(jasmine.any(Function));
    });
    it('should call iElement.classList.add', function() {
      inst.iElement = {classList: {add: jasmine.createSpy('add')}};
      inst.deactivate();
      expect(inst.iElement.classList.add).toHaveBeenCalledWith('d-none');
    });
  });
});
