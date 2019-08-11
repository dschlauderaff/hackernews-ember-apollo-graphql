import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import query from 'hackernews-ember-apollo/gql/queries/allLinks';

export default Route.extend(RouteQueryManager, {

  model(){
    return this.apollo.watchQuery({query}, 'allLinks').catch(error => alert(error))
  }
});
