/* global expect, Function, spyOn */

import { StepOnboarding } from './step-onboarding';

describe('StepOnboarding', () => {
  let main;
  let inst;

  beforeEach(() => {
    main = {dom: {$: () => ({})}};
    inst = new StepOnboarding(main);
  });

  it('should exist and have defaults', function() {
    expect(inst).toEqual(jasmine.any(Object));
    expect(inst.main).toEqual(main);
  });
});
