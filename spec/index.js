import test               from 'tape';
import sinon              from 'sinon';
import nock               from 'nock';
import mixpanelMiddleware from '../src/index';
import fetch              from 'isomorphic-fetch';

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
  const middleware = mixpanelMiddleware('MIXPANEL_TOKEN');
  const isFunction = typeof middleware === "function";

  assert.true(isFunction);

  assert.end();
});

test('doesn\'t make a request when there is not mixpanel meta data and dispatch an action', (assert) => {
  const spy = sinon.spy();
  const action = {
    type: 'NOT_A_MIXPANEL_ACTION'
  };
  const middleware = mixpanelMiddleware('MIXPANEL_TOKEN')({})(spy)(action);

  assert.true(spy.calledWith(action));

  assert.end();
});

test('doesn\'t make a request when there is not mixpanel meta data', (assert) => {  
  const request = nock('https://api.mixpanel.com')
      .get('/track/?data=')
      .reply(200, 'OK');

  const action = {
    type: 'NOT_A_MIXPANEL_ACTION'
  };
  const middleware = mixpanelMiddleware('MIXPANEL_TOKEN')({})(() => {})(action);

  assert.false(request.isDone());

  assert.end();
});

test('makes a request with Base64 payload data when the mixpanel meta data is passed', (assert) => {  
  const request = nock('https://api.mixpanel.com')
      .get('/track/?data=eyJldmVudCI6IlRlc3QgQWN0aW9uIiwicHJvcGVydGllcyI6eyJ0b2tlbiI6Ik1JWFBBTkVMX1RPS0VOIn19')
      .reply(200, 'OK');

  const action = {
    type: 'MIXPANEL_ACTION',
    meta: {
      mixpanel: {
        eventTitle: 'Test Action'
      }
    }
  };
  const middleware = mixpanelMiddleware('MIXPANEL_TOKEN')({})(() => {})(action);

  assert.true(request.isDone());

  assert.end();
});