import { Step } from './step';
import { Game } from './game';

export class StepGame extends Step {

  /**
   * Constructor
   *
   * @param {Object} main Main class reference
   */
  constructor(main) {

    super(main);

    this.round = 1;

    this.iElement = this.main.dom.$('game');
  }

  /**
   * Init class
   */
  init() {

    this.main.request.post('game', {
      gameName: this.main.gameName,
      gameType: this.main.gameType
    }).then((gameData) => {

      this.game = new Game(this.main, gameData);

      this.game.init();

      return null;
    }).catch((err) => this.main.error(err));
  }
}
