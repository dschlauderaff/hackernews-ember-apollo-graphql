import Controller from '@ember/controller'
import { inject as service } from '@ember/service'
import mutation from 'hackernews-ember-apollo/gql/mutations/createLink'

export default Controller.extend({
  apollo: service(),
  auth: service(),

  actions: {
    async createLink() {
      const postedById = this.get('auth').getUserId()
      if (!postedById) {
        console.error('No user logged in')
        return
      }
      const description = this.description
      const url = this.url
      let variables = { description, url, postedById }

      try {
        await this.get('apollo').mutate(
          {
            mutation,
            variables
          },
          'createLink'
        )
        this.set('description', '')
        this.set('url', '')
        this.transitionToRoute('links')
      } catch (error) {
        alert(error)
      }
    }
  }
})
