import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    navigateHome() {
      this.transitionToRoute('links')
    }
  }
});
