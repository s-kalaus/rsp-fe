import { Main } from './main';

describe('Main', function() {
  const inst = new Main();

  it('should be true', function() {
    expect(inst.hello()).toBe('hello');
  });
});
