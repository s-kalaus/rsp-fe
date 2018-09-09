import { Step } from './step';
import { Game } from './game';

export class StepGame extends Step {

  constructor(main) {

    super(main);

    this.round = 1;

    this.iElement = this.main.dom.$('game');
  }

  init() {

    this.main.request.post('game', {
      gameName: this.main.gameName,
      gameType: this.main.gameType
    }).then((gameData) => {

      this.game = new Game(this.main, gameData);

      this.game.init();
    }).catch((err) => this.main.error(err))
  }
}
