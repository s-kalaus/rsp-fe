export class User {

  /**
   * Constructor
   *
   * @param {Object} main Main class reference
   * @param {Object} data User data
   */
  constructor(main, data) {

    this.main = main;
    this.sessionId = data.sessionId;
    this.username = data.username;
    this.gameType = data.gameType;
  }
}
