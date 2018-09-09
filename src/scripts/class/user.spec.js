/* global expect, Function, spyOn */

import { User } from './user';

describe('User', () => {
  let main;
  let data;
  let inst;

  beforeEach(() => {
    main = {test: 1};
    data = {sessionId: 1, username: 2, gameType: 3};
    inst = new User(main, data);
  });

  it('should exist and have defaults', function() {
    expect(inst).toEqual(jasmine.any(Object));
    expect(inst.main).toEqual(main);
    expect(inst.sessionId).toBe(1);
    expect(inst.username).toBe(2);
    expect(inst.gameType).toBe(3);
  });
});
