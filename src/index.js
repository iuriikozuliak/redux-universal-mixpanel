import { Base64 } from 'js-base64';
import fetch      from 'isomorphic-fetch';

const MIXPANEL_ENDPOINT  = 'https://api.mixpanel.com/track';
const makeRequest        = ({ endpoint, payload }) => fetch(`${endpoint}/?data=${payload}`);

export default (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error('Please provide Mixpanel Token');
  }
  return store => next => action => {
    if (typeof action.type !== 'string' || !action.meta || !action.meta.mixpanel) {
      return next(action);
    }
    const {
      type, 
      meta: { 
        mixpanel: { distinctId, eventTitle, eventParams } 
      }
    } = action;

    const event = eventTitle || '';
    const mixpanelEvent = { 
      event,
      properties: {
        token,
        distinct_id: distinctId,
        ...eventParams
      }
    };
    const payload = Base64.encode(JSON.stringify(mixpanelEvent));

    makeRequest({ endpoint: MIXPANEL_ENDPOINT, payload });

    return next(action); 
  }
}