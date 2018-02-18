import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header'


class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Header} />
					</div>
				</BrowserRouter>
			</div>
		)
	}	
};

export default connect(null, actions)(App); //pass in action creators