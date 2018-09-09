/* global expect, Function, spyOn */

import { Game } from './game';

describe('Game', () => {
  let main;
  let game;
  let inst;

  beforeEach(() => {
    main = {dom: {$: () => ({})}};
    game = {gameId: 1, gameType: 'pvc'};
    inst = new Game(main, game);
  });

  it('should exist', function() {
    expect(inst).toEqual(jasmine.any(Object));
  });

  describe('Function: init', () => {
    beforeEach(() => {
      spyOn(inst, 'createComputerControl');
      spyOn(inst, 'createHumanControl');
      spyOn(inst, 'createRound');
    });
    it('should exist', function() {
      expect(inst.init).toEqual(jasmine.any(Function));
    });
    it('should call createComputerControl', function() {
      inst.init();
      expect(inst.createComputerControl).toHaveBeenCalledWith();
    });
    it('should call createHumanControl', function() {
      inst.init();
      expect(inst.createHumanControl).toHaveBeenCalledWith();
    });
    it('should call createRound', function() {
      inst.init();
      expect(inst.createRound).toHaveBeenCalledWith();
    });
  });

  // ...WIP
});
