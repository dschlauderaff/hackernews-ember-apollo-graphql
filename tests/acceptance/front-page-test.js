import { module, test, skip } from 'qunit';
import { addResolveFunctionsToSchema } from 'graphql-tools';
import { visit, currentURL, click, find, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | front page', function(hooks) {
  setupApplicationTest(hooks);

  const mockLink = {
    id: 1,
    url: 'fake.url',
    description: 'test description'
  }

  let schema;

  hooks.beforeEach(() => {
    schema = this.pretender.schema
  })

  skip('visiting /', async function(assert) {
    let done = assert.async()
    let link = Object.assign({}, mockLink)
    let resolvers = {
      Query: {
        link(obj, args) {
          assert.ok(true, 'queries for data')
          return Object.assign({}, link);
        }
      }
    }
    addResolveFunctionsToSchema({ schema, resolvers})

    let apollo = this.owner.lookup('service:apollo')
    let getQueries = () => apollo.client.queryManager.queryStore.getStore()

    await visit('/');

    assert.equal(currentURL(), '/');
    assert.equal(find('[data-test-link=1').innerText, `${link.url} ${link.description}`)
  });
});
