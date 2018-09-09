export class Step {

  /**
   * Constructor
   *
   * @param {Object} main Main class reference
   */
  constructor(main) {

    this.main = main;
  }

  /**
   * Activate step
   */
  activate() {

    this.iElement.classList.remove('d-none');

    this.init();
  }

  /**
   * Deactivate step
   */
  deactivate() {

    this.iElement.classList.add('d-none');
  }
}
