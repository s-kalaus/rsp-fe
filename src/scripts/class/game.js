import { Round } from './round';
import { Main } from './main';

/**
 * Game
 */
export class Game {

  /**
   * Constructor
   *
   * @param {Object} main Main class reference
   * @param {Object} data Game data
   */
  constructor(main, data) {

    this.main = main;
    this.gameId = data.gameId;
    this.gameType = data.gameType;
    this.rounds = [];
    this.score = [0, 0];
    this.computerRoundInterval = null;
    this.computerRoundTimer = null;
    this.iElement = this.main.dom.$('game');
    this.iRound = this.main.dom.$('gameRound');
    this.iParty0 = this.main.dom.$('gameParty0');
    this.iParty1 = this.main.dom.$('gameParty1');
    this.iPartyScore0 = this.main.dom.$('gamePartyScore0');
    this.iPartyScore1 = this.main.dom.$('gamePartyScore1');
    this.iUsername = this.main.dom.$('gameUsername');
    this.iHumanControl = this.main.dom.$('gameHumanControl');
    this.iComputerControl = this.main.dom.$('gameComputerControl');
    this.iHumanControlStop = this.main.dom.$('gameHumanControlStop');
    this.iComputerControlStop = this.main.dom.$('gameComputerControlStop');
  }

  /**
   * Init
   */
  init() {

    this.createComputerControl();
    this.createHumanControl();
    this.createRound();
  }

  /**
   * Creates computer control
   */
  createComputerControl() {

    this.iComputerControlStop.addEventListener('click', () => {

      this.gameType = this.gameType = Main.gameTypePvc;

      clearTimeout(this.computerRoundTimer);
      clearInterval(this.computerRoundInterval);

      this.update();
    }, true);
  }

  /**
   * Creates human control
   */
  createHumanControl() {

    this.main.dom.html(this.iUsername, this.main.user.username);

    this.main.config.objects.forEach((object, index) => {

      const img = this.main.dom.create('img');

      img.src = 'images/' + object.icon;

      img.onclick = () => this.round.finish(index);

      this.iHumanControl.appendChild(img);
    });

    this.iHumanControlStop.addEventListener('click', () => {

      this.gameType = this.gameType = Main.gameTypeCvc;

      this.update();
    }, true);
  }

  /**
   * Creates round
   */
  createRound() {

    this.round = new Round(this.main, this);

    this.rounds.push(this.round);

    this.rounds.splice(0, this.rounds.length - 5);

    this.update();
  }

  /**
   * Updates game ui
   */
  update() {

    this.main.dom.html(this.iRound, this.round.num);

    this.main.dom.css(this.iParty0, {backgroundImage: `url(images/${this.main.config.objects[this.round.partyChoice0].image})`});
    this.main.dom.css(this.iParty1, {backgroundImage: `url(images/${this.main.config.objects[this.round.partyChoice1].image})`});

    this.main.dom.html(this.iPartyScore0, this.score[0]);
    this.main.dom.html(this.iPartyScore1, this.score[1]);

    if (this.gameType === 'pvc') {

      this.iElement.classList.add('pvc');
    } else {

      this.iElement.classList.remove('pvc');

      this.main.dom.html(this.iComputerControl, this.main.config.cvcRoundDelay / 1000);

      this.computerRoundInterval = setInterval(() =>
        this.updateComputerRoundCounter(), 1000);

      this.computerRoundTimer = setTimeout(() =>
        this.round.finish(), this.main.config.cvcRoundDelay);
    }
  }

  /**
   * Update rounds counter
   */
  updateComputerRoundCounter() {

    const counter = Number(this.main.dom.html(this.iComputerControl)) - 1;

    this.main.dom.html(this.iComputerControl, counter);

    if (counter <= 0) {
      clearInterval(this.computerRoundInterval);
    }
  }

  /**
   * Start animation
   */
  animationStart() {

    this.iElement.classList.add('animated');
  }

  /**
   * Stop animation
   */
  animationStop() {

    this.iElement.classList.remove('animated');
  }
}
