import { Promise } from 'bluebird';

export class Round {

  /**
   * Constructor
   *
   * @param {Object} main Main class reference
   * @param {Object} game Game data
   */
  constructor(main, game) {

    const roundPrev = game.rounds.length ? game.rounds[game.rounds.length - 1] : null;

    this.main = main;
    this.game = game;
    this.num = roundPrev ? roundPrev.num + 1 : 1;
    this.partyChoice0 = roundPrev ? roundPrev.partyChoice0 : 0;
    this.partyChoice1 = roundPrev ? roundPrev.partyChoice1 : 0;
  }

  /**
   * Finish round
   *
   * @param {Number} choice Choice index
   */
  finish(choice) {

    this.game.animationStart();

    Promise.all([
      this.main.request
        .post(
          'game/' + this.game.gameId + '/round',
          choice === undefined ? {} : {choice}
        ),
      new Promise(resolve =>
        setTimeout(() => resolve(), this.main.config.roundAnimationDuration))
    ]).then((result) => {

      this.game.animationStop();

      this.processResult(result[0]);

      return null;
    }).catch((err) => {

      this.main.error(err);

      this.game.animationStop();

      return null;
    });
  }

  /**
   * Process Result
   *
   * @param {Object} roundData New round data
   */
  processResult(roundData) {

    this.roundId = roundData.roundId;
    this.partyChoice0 = roundData.partyChoice0;
    this.partyChoice1 = roundData.partyChoice1;
    this.winner = roundData.winner;

    if (this.game.score[roundData.winner] !== undefined) {
      this.game.score[roundData.winner]++;
    }

    this.game.createRound();
  }
}
