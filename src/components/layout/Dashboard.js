import React from 'react';

import PokemonList from '../pokemon/Pokedex';

export default function Dashboard() {
	return (
		<div className="row">
			<div className="col">
				<PokemonList />
			</div>
		</div>
	);
}