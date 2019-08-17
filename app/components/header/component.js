import Component from '@ember/component';
import { inject as service } from '@ember/service'
import { oneWay } from '@ember/object/computed'

export default Component.extend({
  auth: service(),

  userLoggedIn: oneWay('auth.isLoggedIn'),

  actions: {
    async logout() {
      await this.get('auth').logout()
      this.onLogout()
    }
  }
});
