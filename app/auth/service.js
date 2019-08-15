import Service from "@ember/service";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import signInUserMutation from "hackernews-ember-apollo/gql/mutations/signInUser";
import createUser from "hackernews-ember-apollo/gql/mutations/createUser";

const GC_USER_ID = "graphcool-user-id";
const GC_AUTH_TOKEN = "graphcool-auth-token";

export default Service.extend({
  init() {
    this._super(...arguments);
    this.getUserId();
    this.getAuthToken();
  },

  apollo: service(),
  authToken: null,
  userId: null,

  isLoggedIn: computed("userId", function() {
    return !!this.userId;
  }),

  async loginOrSignUp(state, name, email, password) {
    const apollo = this.get("apollo");
    let variables;
    try {
      if (state) {
        variables = { email, password };
        const result = await apollo.mutate({
          mutation: signInUserMutation,
          variables
        });
        this.saveUserData(result.user.id, result.token);
      } else {
        variables = { name, email, password };
        const result = await apollo.mutate({
          mutation: createUser,
          variables
        });

        debugger
        const { signupUser } = result;
        this.saveUserData(signupUser.id, signupUser.token);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async logout() {
    await this.removeUserId();
    await this.removeAuthToken();
  },

  saveUserData(id, token) {
    this.setUserId(id);
    this.setAuthToken(token);
  },

  getUserId() {
    const userId = localStorage.getItem(GC_USER_ID);
    this.setUserId(userId);
    return userId;
  },

  getAuthToken() {
    const token = localStorage.getItem(GC_AUTH_TOKEN);
    this.setAuthToken(token);
    return token;
  },

  removeUserId() {
    localStorage.removeItem(GC_USER_ID);
    this.set("userId", null);
  },

  removeAuthToken() {
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.set("authToken", null);
  },

  setUserId(id) {
    localStorage.setItem(GC_USER_ID, id);
    this.set("userId", id);
  },

  setAuthToken(token) {
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.set("authToken", token);
  }
});
