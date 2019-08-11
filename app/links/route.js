import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return [
      { 
        id: '1',
        description: 'The Coolest GraphQL Backend 😎',
        url: 'https://www.graph.cool'
      },
      {
        id: '2',
        description: 'The Best GraphQL Client',
        url: 'http://dev.apollodata.com/'
    
      }
    ]
  }
});
