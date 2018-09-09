/* global expect, Function, spyOn */

import { Round } from './round';

describe('Round', () => {
  let main;
  let game;
  let inst;

  beforeEach(() => {
    main = {};
    game = {rounds: []};
    inst = new Round(main, game);
  });

  it('should exist', function() {
    expect(inst).toEqual(jasmine.any(Object));
  });

  // ...WIP
});
