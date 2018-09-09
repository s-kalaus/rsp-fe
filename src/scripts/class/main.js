/* global ENV */

import { Request } from './request';
import { StepOnboarding } from './step-onboarding';
import { StepGame } from './step-game';
import { Dom } from './dom';

export class Main {

  constructor() {

    this.gameName = Main.gameName;
    this.config = ENV;
  }

  init() {

    this.dom = new Dom();

    this.steps = {
      onboarding: new StepOnboarding(this),
      game: new StepGame(this)
    };

    this.request = new Request(this);

    this.request.get('static/' + this.gameName).then((config) => {

      this.config = Object.assign({}, this.config, config);

      this.setStep(Main.stepOnboarding);
    });
  }

  setStep(stepName) {

    this.step = this.steps[stepName];

    Object.keys(this.steps).forEach((theStepName) => stepName === theStepName
      ? this.steps[theStepName].activate()
      : this.steps[theStepName].deactivate()
    );
  }

  error(err) {

    console.error(err);
  }
}

Main.stepOnboarding = 'onboarding';
Main.stepGame = 'game';
Main.gameTypePvc = 'pvc';
Main.gameTypeCvc = 'cvc';
Main.gameName = 'rsp';
