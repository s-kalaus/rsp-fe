export class User {

  constructor(main, data) {

    this.main = main;
    this.sessionId = data.sessionId;
    this.username = data.username;
    this.gameType = data.gameType;
  }
}
