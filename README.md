#redux-universal-mixpanel
Lightweight universal Mixpanel middleware for Redux, both for client and server, without mixpanel/mixpanel-browser dependencies

```bash
npm install --save redux-universal-mixpanel
```

### Usage
```javascript
import mixpanelMiddleware               from 'redux-universal-mixpanel'
import { applyMiddleware, createStore } from 'redux';

const MIXPANEL_TOKEN = 'YOUR-MIXPANEL-TOKEN-HERE';

// init and apply middleware
const middlewares = [
  routerMiddleware(browserHistory),
  mixpanelMiddleware(MIXPANEL_TOKEN),
  ...
];
const store = applyMiddleware(...middlewares)(createStore)(reducer);

```

### Add Mixpanel data to actions you would like to track
Add Mixpanel data object to meta
```javascript
{
  type: MIXPANEL_ACTION,
  meta: {
    mixpanel: {
      distinctId: '123456789ABCDEF0==',
      eventTitle: 'Filter daterange change',
      eventParams: {
        from: '2015-05-20',
        to: '2015-05-27'
      }
    }
  }
}
```