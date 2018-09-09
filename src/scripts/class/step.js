export class Step {

  constructor(main) {

    this.main = main;
  }

  activate() {

    this.iElement.classList.remove('d-none');

    this.init();
  }

  deactivate() {

    this.iElement.classList.add('d-none');
  }
}
