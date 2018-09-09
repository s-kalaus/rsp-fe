/* global expect, ENV, Function, spyOn */

import { Promise } from 'bluebird';

import { Dom } from './dom';
import { Main } from './main';
import { StepOnboarding } from './step-onboarding';
import { StepGame } from './step-game';
import { Request } from './request';

describe('Main', () => {
  let inst;

  beforeEach(() => {
    inst = new Main();
  });

  it('should exist and have defaults', function() {
    expect(inst).toEqual(jasmine.any(Object));
    expect(inst.gameName).toBe('rsp');
    expect(inst.config).toEqual(ENV);
  });

  describe('Function: init', () => {
    it('should exist', function() {
      expect(inst.init).toEqual(jasmine.any(Function));
    });
    it('should set dom', function() {
      inst.init();
      expect(inst.dom).toEqual(new Dom());
    });
    it('should set steps', function() {
      inst.init();
      expect(inst.steps).toEqual({
        onboarding: new StepOnboarding(inst),
        game: new StepGame(inst)
      });
    });
    it('should set request', function() {
      inst.init();
      expect(inst.request).toEqual(new Request(inst));
    });
  });

  describe('Function: initGameSchema', () => {
    beforeEach(() => {
      inst.init();
      spyOn(inst, 'setStep');
    });
    it('should exist', function() {
      expect(inst.initGameSchema).toEqual(jasmine.any(Function));
    });
    it('should call request.get', function() {
      spyOn(inst.request, 'get').and.returnValue({then: () => ({})});
      inst.initGameSchema();
      expect(inst.request.get).toHaveBeenCalledWith('static/rsp');
    });
    it('should set config', function() {
      spyOn(inst.request, 'get').and.returnValue({then: (callback) => callback({test: 1})});
      inst.initGameSchema();
      expect(inst.config).toEqual({apiUrl: 'api-url', test: 1});
    });
    it('should call setStep', function() {
      spyOn(inst.request, 'get').and.returnValue({then: (callback) => callback({test: 1})});
      inst.initGameSchema();
      expect(inst.setStep).toHaveBeenCalledWith('onboarding');
    });
  });

  describe('Function: setStep', () => {
    beforeEach(() => {
      inst.init();
    });
    it('should exist', function() {
      expect(inst.setStep).toEqual(jasmine.any(Function));
    });
    it('should call init onboarding', function() {
      spyOn(inst.steps.onboarding, 'activate');
      spyOn(inst.steps.game, 'deactivate');
      inst.setStep('onboarding');
      expect(inst.steps.onboarding.activate).toHaveBeenCalledWith();
      expect(inst.steps.game.deactivate).toHaveBeenCalledWith();
    });
  });

  describe('Function: error', () => {
    it('should exist', function() {
      expect(inst.error).toEqual(jasmine.any(Function));
    });
    it('should log to console', function() {
      spyOn(console, 'error');
      const err = new Error('test');
      inst.error(err);
      expect(console.error).toHaveBeenCalledWith(err);
    });
  });
});
