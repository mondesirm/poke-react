import React from 'react';
import Link from '../helpers/Link';
import styled from 'styled-components';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';

const StyledImg = styled.img`
	${'' /* height: 225px; width: 100%; display: block; */}
	width: 200px; height: 250px
`;

const StyledJumbotron = styled(Jumbotron)`
	background: #181a1bcc;
	color: #e8e6e3;
	border-radius: .25rem;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	&:hover { box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }
	user-select: none;
	-moz-user-select: none;
	-website-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
`;

const StyledLink = styled(Link)`
	color: black;
	&, &:focus, &:hover, &:visited, &:link, &:active { text-decoration: none; }
`;

export default function Home() {
	return (
		<>
			<StyledJumbotron fluid className='text-center'>
				<Container>
					<h1 class="jumbotron-heading">React Pokédex</h1>
					<p class="lead text-muted">Website made with React and Bootstrap showing data on Pokemons. Below, you will find a quick description of the APIs used for this website.</p>
					<Link to='/pokedex' className="btn btn-primary my-2">Explore the Pokédex</Link>
				</Container>
			</StyledJumbotron>
			
			<div className="row mb-2">
				<div className="col-md-12">
					<div className="homeCard card flex-md-row mb-4 box-shadow h-md-250">
						<div className="card-body d-flex flex-column align-items-start">
							<strong className="d-inline-block mb-2 text-success">Pokemon Data (JSON)</strong>
							<h3 className="mb-0"><a className="text-white" href="https://pokeapi.co/">PokéAPI.co RESTful API</a></h3>
							<div class="mb-1 text-muted">The RESTful Pokémon API</div>
							<p className="card-text mb-auto text-white">
								All the Pokémon data easily accessible through a modern RESTful API.
								This is linked to an extensive database detailing everything about the Pokémon main game series.
							</p>
							<a className="btn btn-secondary my-2" href="https://pokeapi.co/">Visit the website</a>
						</div>
						<img className="card-img-right d-none d-md-block" alt="Thumbnail" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" style={{width: '70%'}}/>
					</div>
				</div>

				<div className="col-md-12">
					<div className="homeCard card flex-md-row mb-4 box-shadow h-md-250">
						<div className="card-body d-flex flex-column align-items-start">
							<strong className="d-inline-block mb-2 text-success">Pokemon Sounds (MP3)</strong>
							<h3 className="mb-0"><a className="text-white" href="https://pokemoncries.com/">Pokemoncries.com Soundbank</a></h3>
							<p className="card-text mb-auto text-white">
								<u>pokemoncries.com</u> is a website that lets the visitors guess the pokemon based on its GameBoy cry,
								from Generation 1 to Generation 8. For the making of this Pokédex, I needed the MP3 files which were difficult to find hosted online.
							</p>
							<a className="btn btn-secondary my-2" href="https://pokemoncries.com/">Visit the website</a>
						</div>
						<img className="card-img-right flex-auto d-none d-md-block" alt="Thumbnail" src="https://tomnick.org/videos/pokemoncries.png" style={{width: '30%'}} />
					</div>
				</div>
			</div>
		</>
	);
}