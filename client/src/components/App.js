import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchUser } from '../actions';
import axios from 'axios';


import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Active from './Active';
import GuestPage from './GuestPage';



class App extends Component {
	async componentDidMount() {
		const res = await axios.get('/api/current_user');
		this.props.dispatch(fetchUser(res.data));
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
						<Route path="/guest" component={GuestPage}/>
					</div>
				</BrowserRouter>
			</div>
		)
	}	
};

export default connect()(App); //pass in action creators