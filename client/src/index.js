import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
//first arg is reducers
//second is initial state
//third is apply middleware
const store = createStore(
	reducers
);

ReactDOM.render(
	<Provider store={store}><App /></Provider>, 
	document.getElementById('root'));
