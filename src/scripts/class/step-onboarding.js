import { Main } from './main';
import { Step } from './step';
import { User } from './user';

export class StepOnboarding extends Step {

  constructor(main) {

    super(main);

    this.name = 'onboarding';
    this.iElement = this.main.dom.$('onboarding');
    this.iForm = this.main.dom.$('onboardingForm');
    this.iPromo = this.main.dom.$('onboardingPromo');
    this.iName = this.main.dom.$('onboardingName');
    this.iDescription = this.main.dom.$('onboardingDescription');
  }

  init() {

    this.initInfo();
    this.initPromo();
    this.initForm();
  }

  initInfo() {

    this.main.dom.html(this.iName, this.main.config.name);
    this.main.dom.html(this.iDescription, this.main.config.description);
  }

  initPromo() {

    this.main.dom.html(this.iPromo, '');

    this.main.config.objects.forEach((object) => {

      const img = this.main.dom.create('img');

      img.src = 'images/' + object.icon;

      this.iPromo.appendChild(img);
    });
  }

  initForm() {

    this.iForm.addEventListener('submit', (event) => {

      event.preventDefault();

      this.onSubsmit();
    }, true);
  }

  onSubsmit() {

    this.main.gameType = this.iForm.gameType.value;

    this.main.request.post('user', {
      username: this.iForm.username.value
    }).then((userData) => {

      this.main.user = new User(this.main, userData);

      this.main.setStep(Main.stepGame);
    }).catch((err) => this.main.error(err));
  }
}
