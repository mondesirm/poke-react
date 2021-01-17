import React, { Component } from 'react';
import Route from "./components/helpers/Route";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/layout/NavBar';
import Home from './components/layout/Home';
import Dashboard from './components/layout/Dashboard';
import Pokemon from './components/pokemon/Pokemon';

function importAll(r) {
	return r.keys().map(r);
}

// Store each path of an image in the specified directory
const bgImages = importAll(require.context('./img/bg', false, /\.(png|jpe?g|svg)$/));

export default class App extends Component {
	constructor(props) {
		super(props);
		// Set default BG to the 1st image
		this.pos = 0;
		this.state = { autoBG: "url(" + bgImages[this.pos].default + ")" };
	}

	async componentDidMount() {
		// Change BG every 5s
		this.interval = setInterval(() => {
			this.pos = (this.pos > bgImages.length-2) ? 0 : this.pos+1;
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	render() {
		return (
			<div className="App" style={{ backgroundImage: this.state.autoBG }}>
				<NavBar/>
				<div className="container">
					<Route path="/">
						<Home/>
					</Route>

					<Route path="/pokedex">
						<Dashboard/>
					</Route>

					<Route path="/pokemon">
						<Pokemon/>
					</Route>
				</div>
			</div>
		);
	}
}