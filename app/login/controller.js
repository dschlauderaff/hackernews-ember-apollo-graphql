import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  auth: service(),
  loginState: true,

  actions: {
    changeLoginState() {
      this.toggleProperty("loginState");
    },

    async loginOrSignUp() {
      const loginState = this.loginState;
      const email = this.email;
      const name = this.name;
      const password = this.password;

      try {
        await this.auth.loginOrSignUp(loginState, name, email, password);
        this.transitionToRoute("/");
      } catch (error) {
        console.log("controller", error);
      }
    }
  }
});
