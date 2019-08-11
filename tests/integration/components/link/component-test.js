import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('link', {
      id: '1',
      description: 'The Coolest GraphQL Backend 😎',
      url: 'https://www.graph.cool'
    })

    await render(hbs`<Link @link={{this.link}}/>`);

    assert.equal(this.element.textContent.trim(), 'The Coolest GraphQL Backend 😎 (https://www.graph.cool)');

    
  });
});
