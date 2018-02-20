import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Active from './Active';



class App extends Component {
	componentDidMount() {
		console.log('app prop', this.props);
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route path="/dashboard" component={Dashboard}/>
						<Route path="/active" component={Active}/>

					</div>
				</BrowserRouter>
			</div>
		)
	}	
};

export default connect(null, actions)(App); //pass in action creators