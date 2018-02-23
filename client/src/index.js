import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

let store = compose(
	autoRehydrate()
)(createStore)(reducers);


persistStore(store);

ReactDOM.render(
	<Provider store={store}><App /></Provider>, 
	document.getElementById('root'));
