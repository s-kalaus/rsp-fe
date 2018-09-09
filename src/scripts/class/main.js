/* global ENV */

import { Request } from './request';
import { StepOnboarding } from './step-onboarding';
import { StepGame } from './step-game';
import { Dom } from './dom';

/**
 * Main
 */
export class Main {

  /**
   * Constructor
   */
  constructor() {

    this.gameName = Main.gameName;
    this.config = ENV;
  }

  /**
   * Init class
   */
  init() {

    this.dom = new Dom();

    this.steps = {
      onboarding: new StepOnboarding(this),
      game: new StepGame(this)
    };

    this.request = new Request(this);
  }

  /**
   * Init Game Schema
   */
  initGameSchema() {

    this.request.get('static/' + this.gameName).then((config) => {

      this.config = Object.assign({}, this.config, config);

      this.setStep(Main.stepOnboarding);

      return null;
    });
  }

  /**
   * Set Step
   *
   * @param {String} stepName Name of step
   */
  setStep(stepName) {

    this.step = this.steps[stepName];

    Object.keys(this.steps).forEach((theStepName) => stepName === theStepName
      ? this.steps[theStepName].activate()
      : this.steps[theStepName].deactivate()
    );
  }

  /**
   * Send error
   *
   * @param {Object} err Error object
   */
  error(err) {

    // eslint-disable-next-line no-console
    console.error(err);
  }
}

Main.stepOnboarding = 'onboarding';
Main.stepGame = 'game';
Main.gameTypePvc = 'pvc';
Main.gameTypeCvc = 'cvc';
Main.gameName = 'rsp';
