import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import mutation from 'hackernews-ember-apollo/gql/mutations/createLink'

export default Controller.extend({
  apollo: service(),

  actions: {
    async createLink() {
      const description = this.description
      const url = this.url
      let variables = { description, url }

      try {
        await this.apollo.mutate(
          {
            mutation,
            variables
          },
          'createLink'
        )
        this.set('description', '')
        this.set('url', '')
        this.transitionToRoute('links')
      } catch(error) {
        alert(error)
      }
    }
  }
});
