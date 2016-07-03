import test               from 'tape';
import mixpanelMiddleware from '../src/index';

test('throws an error if Mixpanel token is not passed', (assert) => {
  assert.throws(() => mixpanelMiddleware(), new Error);

  assert.end();
});

test('throws an error if not a string is passed', (assert) => {
  assert.throws(() => mixpanelMiddleware({}), new Error);

  assert.end();
});

test('doesn\'t throw an error if Token is passed', (assert) => {
  assert.doesNotThrow(() => mixpanelMiddleware('MIXPANEL_TOKEN'));

  assert.end();
});

test('returns a function when token is passed', (assert) => {
  var middleware = mixpanelMiddleware('MIXPANEL_TOKEN');

  var isFunction = typeof middleware === "function";

  assert.true(isFunction);

  assert.end();
});