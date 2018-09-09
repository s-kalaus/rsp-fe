/* global expect, Function, spyOn */

import { Promise } from 'bluebird';

import { Game } from './game';
import { StepGame } from './step-game';

describe('StepGame', () => {
  let main;
  let inst;
  let resolve;
  let reject;

  beforeEach(() => {
    main = {
      config: {objects: [{image: ''}]},
      user: {username: 'test'},
      dom: {css: () => {}, $: () => ({classList: {add: () => {}, remove: () => {}}, addEventListener: () => {}, appendChild: () => {}}), create: () => ({addEventListener: () => {}}), html: () => {}},
      request: {post: jasmine.createSpy('post').and.returnValue({then: (_resolve) => { resolve = _resolve; return { catch: (_reject) => reject = _reject }; }})},
      gameName: 2,
      gameType: 3,
      error: jasmine.createSpy('error')
    };
    inst = new StepGame(main);
  });

  it('should exist and have defaults', function() {
    expect(inst).toEqual(jasmine.any(Object));
    expect(inst.main).toEqual(main);
    expect(inst.round).toBe(1);
    expect(inst.iElement).toEqual(jasmine.any(Object));
  });

  describe('Function: init', () => {
    it('should exist', function() {
      expect(inst.init).toEqual(jasmine.any(Function));
    });
    it('should set game', function() {
      inst.init();
      resolve({test: 1});
      expect(inst.game).toEqual(jasmine.any(Object));
    });
    it('should react on error', function() {
      const err = new Error('test');
      inst.init();
      reject(err);
      expect(inst.main.error).toHaveBeenCalledWith(err);
    });
  });
});
