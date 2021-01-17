import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { Offline, Online } from "react-detect-offline";
import loader from '../../img/pikachu.gif';
// import Card from '../pokemon/PokemonCard';
// import Sprite from '../pokemon/PokemonCard';

// React.Fragment
const Card = styled.div`
	background: #181a1bcc;
	color: #e8e6e3;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	&:hover { box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }
	user-select: none;
`;

export default class Loading extends Component {
	render() {
		return (
			<Card className="card text-center">
				<h5 className="card-header">Fetching Pokedex Data...</h5>
				<img src={loader} alt='loader' className='loader rounded mx-auto d-block mt-2' />
				<ReactLoading type='bubbles' color='red' className='card-img-top rounded mx-auto d-block mt-2' />
				
				<h6 className="mx-auto">
					<span className="badge badge-danger mt-2">
						<Online>Dead Link</Online>
						<Offline>No Internet Connection</Offline>
					</span>
				</h6>

				<div className="card-body mx-auto">
					<h6 className="card-title">
						<Online>The Pokemon API might have changed locations, testing network connection...</Online>
						<Offline>Please connect to a network first.</Offline>
					</h6>
				</div>
			</Card>
		);
	}
}
	