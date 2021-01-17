import React, { Component } from 'react';
import axios from 'axios';
import TYPE_COLORS from '../helpers/typeColors.js';
import Card from '../helpers/styledTags.js';

function playCry(pID) {
	const audio = new Audio(`https://pokemoncries.com/cries/${pID}.mp3`);
	if (pID){ audio.play(); };
}

let notFound = '[Unknown]';
export default class Pokemon extends Component {
	state = {
		name: notFound,
		pokemonIndex: notFound,
		imageUrl: notFound,
		types: [],
		description: notFound,
		statTitleWidth: 3,
		statBarWidth: 9,
		stats: {
			hp: notFound,
			attack: notFound,
			defense: notFound,
			speed: notFound,
			specialAttack: notFound,
			specialDefense: notFound
		},
		height: notFound,
		weight: notFound,
		eggGroups: notFound,
		catchRate: notFound,
		abilities: notFound,
		genderRatioMale: notFound,
		genderRatioFemale: notFound,
		evs: notFound,
		hatchSteps: notFound,
		themeColor: '#EF5350'
	};

	async componentDidMount() {
		// const { pokemonIndex } = this.props.match.params;
		// const pokemonIndex = this.props.pokemonIndex || 1;
		const url = window.location.pathname;
		var num = parseInt(url.split('/')[2]);
		const pokemonIndex = num;

		// Urls to fetch from
		const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
		const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

		// Get Pokemon Information
		await axios.get(pokemonUrl).then(pokemonRes => {
			const name = pokemonRes.data.name;
			const imageUrl = pokemonRes.data.sprites.front_default;
			// const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonIndex}.gif?raw=true`;

			let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

			pokemonRes.data.stats.map(stat => {
				switch (stat.stat.name) {
					case 'hp':
						hp = stat['base_stat'];
						break;
					case 'attack':
						attack = stat['base_stat'];
						break;
					case 'defense':
						defense = stat['base_stat'];
						break;
					case 'speed':
						speed = stat['base_stat'];
						break;
					case 'special-attack':
						specialAttack = stat['base_stat'];
						break;
					case 'special-defense':
						specialDefense = stat['base_stat'];
						break;
					default:
						break;
				}
				return stat.stat.name;
			});

			// Convert dm to ft and round to two decimal places
			// const height = Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;
			// const weight = Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;
			// Convert dm to cm and round to two decimal places
			const height = Math.round((pokemonRes.data.height * 10 + 0.00001) * 100) / 100;
			const weight = Math.round((pokemonRes.data.weight / 10 + 0.00001) * 100) / 100;

			const types = pokemonRes.data.types.map(type => type.type.name);

			const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

			const abilities = pokemonRes.data.abilities.map(ability => {
				return ability.ability.name
					.toLowerCase()
					.split('-')
					.map(s => s.charAt(0).toUpperCase() + s.substring(1))
					.join(' ');
			}).join(', ');

			const evs = pokemonRes.data.stats.filter(stat => {
				if (stat.effort > 0) {
					return true;
				}
				return false;
			}).map(stat => {
					return `${stat.effort} ${stat.stat.name
						.toLowerCase()
						.split('-')
						.map(s => s.charAt(0).toUpperCase() + s.substring(1))
						.join(' ')}`;
			}).join(', ');

			this.setState({
				imageUrl,
				pokemonIndex,
				name,
				types,
				stats: {
					hp,
					attack,
					defense,
					speed,
					specialAttack,
					specialDefense
				},
				themeColor,
				height,
				weight,
				abilities,
				evs
			});	
		}).catch(e => { console.log(e) })

		// Get Pokemon Species Information
		await axios.get(pokemonSpeciesUrl).then(res => {
			let description = '';
			res.data.flavor_text_entries.some(flavor => {
				if (flavor.language.name === 'en') {
					description = flavor.flavor_text;
					return description;
				}
				return null;
			});
			const femaleRate = res.data['gender_rate'];
			const genderRatioFemale = 12.5 * femaleRate;
			const genderRatioMale = 12.5 * (8 - femaleRate);

			const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

			const eggGroups = res.data['egg_groups']
				.map(group => {
					return group.name
						.toLowerCase()
						.split(' ')
						.map(s => s.charAt(0).toUpperCase() + s.substring(1))
						.join(' ');
				})
				.join(', ');

			const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

			this.setState({
				description,
				genderRatioFemale,
				genderRatioMale,
				catchRate,
				eggGroups,
				hatchSteps
			});
		}).catch(e => { console.log(e) });

		playCry(pokemonIndex);
	}

	render() {
		return (
			<div className="col">
				<Card className="card">
					<div className="card-header">
						<div className="row">
							<div className="col-5">
								<h5>{this.state.pokemonIndex}</h5>
								{/* <GetPokemonIndex /> */}
							</div>
							<div className="col-7">
								<div className="float-right">
									{this.state.types.map(type => (
										<span
											key={type}
											className="badge badge-pill mr-1"
											style={{
												backgroundColor: `#${TYPE_COLORS[type]}`,
												color: 'white'
											}}
										>
											{type
												.toLowerCase()
												.split(' ')
												.map(s => s.charAt(0).toUpperCase() + s.substring(1))
												.join(' ')}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="card-body">
						<div className="row align-items-center">
							<div className="col-md-3 ">
								<img
									src={this.state.imageUrl}
									alt='pokemon'
									className="card-img-top rounded mx-auto mt-2"									
								/>
							</div>
							<div className="col-md-9">
								<h4 className="mx-auto">
									{this.state.name
										.toLowerCase()
										.split(' ')
										.map(s => s.charAt(0).toUpperCase() + s.substring(1))
										.join(' ')}
								</h4>
								<div className="row align-items-center">
									<div className={`col-12 col-md-${this.state.statTitleWidth}`}>
										HP
									</div>
									<div className={`col-12 col-md-${this.state.statBarWidth}`}>
										<div className="progress">
											<div
												className="progress-bar "
												role="progressbar"
												style={{
													width: `${this.state.stats.hp}%`,
													backgroundColor: `#${this.state.themeColor}`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>{this.state.stats.hp}</small>
											</div>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className={`col-12 col-md-${this.state.statTitleWidth}`}>
										Attack
									</div>
									<div className={`col-12 col-md-${this.state.statBarWidth}`}>
										<div className="progress">
											<div
												className="progress-bar"
												role="progressbar"
												style={{
													width: `${this.state.stats.attack}%`,
													backgroundColor: `#${this.state.themeColor}`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>{this.state.stats.attack}</small>
											</div>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className={`col-12 col-md-${this.state.statTitleWidth}`}>
										Defense
									</div>
									<div className={`col-12 col-md-${this.state.statBarWidth}`}>
										<div className="progress">
											<div
												className="progress-bar "
												role="progressbar"
												style={{
													width: `${this.state.stats.defense}%`,
													backgroundColor: `#${this.state.themeColor}`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>{this.state.stats.defense}</small>
											</div>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className={`col-12 col-md-${this.state.statTitleWidth}`}>
										Speed
									</div>
									<div className={`col-12 col-md-${this.state.statBarWidth}`}>
										<div className="progress">
											<div
												className="progress-bar"
												role="progressbar"
												style={{
													width: `${this.state.stats.speed}%`,
													backgroundColor: `#${this.state.themeColor}`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>{this.state.stats.speed}</small>
											</div>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className={`col-12 col-md-${this.state.statTitleWidth}`}>
										Sp Atk
									</div>
									<div className={`col-12 col-md-${this.state.statBarWidth}`}>
										<div className="progress">
											<div
												className="progress-bar "
												role="progressbar"
												style={{
													width: `${this.state.stats.specialAttack}%`,
													backgroundColor: `#${this.state.themeColor}`
												}}
												aria-valuenow={this.state.stats.specialAttack}
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>{this.state.stats.specialAttack}</small>
											</div>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className={`col-12 col-md-${this.state.statTitleWidth}`}>
										Sp Def
									</div>
									<div className={`col-12 col-md-${this.state.statBarWidth}`}>
										<div className="progress">
											<div
												className="progress-bar "
												role="progressbar"
												style={{
													width: `${this.state.stats.specialDefense}%`,
													backgroundColor: `#${this.state.themeColor}`
												}}
												aria-valuenow={this.state.stats.specialDefense}
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>{this.state.stats.specialDefense}</small>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row mt-1">
							<div className="col">
								<p className="">{this.state.description}</p>
							</div>
						</div>
					</div>
					<hr />
					<div className="card-body">
						<h5 className="card-title text-center">Profile</h5>
						<div className="row">
							<div className="col-md-6">
								<div className="row">
									<div className="col-6">
										<h6 className="float-right">Height:</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">{this.state.height} cm</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">Weight:</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">{this.state.weight} kg</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">Catch Rate:</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">{this.state.catchRate}%</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">Gender Ratio:</h6>
									</div>
									<div className="col-6">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressbar"
												style={{
													width: `${this.state.genderRatioFemale}%`,
													backgroundColor: '#c2185b'
												}}
												aria-valuenow="15"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>{this.state.genderRatioFemale}</small>
											</div>
											<div
												className="progress-bar"
												role="progressbar"
												style={{
													width: `${this.state.genderRatioMale}%`,
													backgroundColor: '#1976d2'
												}}
												aria-valuenow="30"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>{this.state.genderRatioMale}</small>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="row">
									<div className="col-6">
										<h6 className="float-right">Egg Groups:</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">{this.state.eggGroups} </h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">Hatch Steps:</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">{this.state.hatchSteps}</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">Abilities:</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">{this.state.abilities}</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">EVs:</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">{this.state.evs}</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</div>
		);
	}
}
