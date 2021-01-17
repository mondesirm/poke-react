import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import HLink from "../helpers/Link";
import styled from 'styled-components';

const Sprite = styled.img`
	width: 5em;
	height: 5em;
	display: none;
`;

const Card = styled.div`
	background: #181a1bcc;
	color: #e8e6e3;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	&:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	}
	user-select: none;
	-moz-user-select: none;
	-website-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
`;

// const StyledLink = styled.a`
const StyledLink = styled(HLink)`
	text-decoration: none;
	color: black;

	&:focus, &:hover, &:visited, &:link, &:active {
		text-decoration: none;
	}
`;

export default class Pokecard extends Component {
	state = {
		name: '',
		imageUrl: '',
		types: '',
		pokemonIndex: '',
		imageLoading: true,
		tooManyRequests: false
	};

	async componentDidMount() {
		const { name, url, types } = this.props;
		const pokemonIndex = url.split('/')[url.split('/').length - 2];
		const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true?` + (new Date()).getTime();
		// const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonIndex}.gif?raw=true`;

		this.setState({ name, imageUrl, types, pokemonIndex });
		// console.log(this.state.pokemonIndex);
	}

	render() {
		return (
			<div className="col-pk mt-3 mb-3">
				{/* <StyledLink to={`pokemon/${this.state.pokemonIndex}`}> */}
				<StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
					<Card className="card d-flex">
						<h5 className="card-header border-0 position-fixed">{this.state.pokemonIndex}</h5>
						{/* Types: {this.state.types} */}
							{/* <img
								src={spinner}
								style={{ width: '5em', height: '5em' }}
								className="card-img-top rounded mx-auto d-block mt-2"
							/> */}
						{this.state.imageLoading ? (
							<ReactLoading type='bubbles' color='red' width='80px' height='80px' className='card-img-top rounded mx-auto d-block mt-2' />
						) : null}
						<Sprite
							className="card-img rounded mx-auto mt-2"
							src={this.state.imageUrl}
							onLoad={() => this.setState({ imageLoading: false })}
							onError={
								() => this.setState({ tooManyRequests: true })
							}
							style={
								this.state.tooManyRequests ? { display: 'none' } : this.state.imageLoading ? null : { display: 'block', zIndex: 0 }
							}
						/>
						{this.state.tooManyRequests ? (
							<h6 className="mx-auto">
								<span className="badge badge-danger mt-2">
									Too Many Requests
								</span>
							</h6>
						) : null}
						<div className="card-body text-center">
							<h6 className="card-title">
								{
									this.state.name
									.toLowerCase()
									.split(' ')
									.map(s => s.charAt(0).toUpperCase() + s.substring(1))
									.join(' ')
								}
							</h6>
						</div>
					</Card>
				</StyledLink>
			</div>
		);
	}
}
