import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Loading from '../layout/Loading';
import Pagination from '../layout/Pagination';
import PokemonCard from './Pokecard';

export default function Pokedex() {
	const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
	const [nextUrl, setNextUrl] = useState('');
	const [prevUrl, setPrevUrl] = useState('');
	const [pokemon, setPokemon] = useState(null);
	const [filter, setFilter] = useState('');
	
	useEffect(() => {
		async function fetchData() {
			await axios.get(url, {headers: {'Cache-Control': 'no-cache'}}).then(res => {
				setPokemon(res.data['results']);
				setPrevUrl(res.data.previous);
				setNextUrl(res.data.next);
			}).catch(e => { console.log(e) })
		}
		fetchData();
	}, [url]);

	const prev = async () => {
		if (!prevUrl) return;
		const res = await axios.get(prevUrl);
		setPrevUrl(res.data.previous);
		setNextUrl(res.data.next);
		setPokemon(res.data['results']);
	}
	
	const next = async () => {
		const res = await axios.get(nextUrl);
		setPrevUrl(res.data.previous);
		setNextUrl(res.data.next);
		setPokemon(res.data['results']);
	}

	const handleSearchChange = (e) => {
		let check = setTimeout(() => {
			if (e.target.value) {
				setUrl('https://pokeapi.co/api/v2/pokemon?limit=-1');
				setFilter(e.target.value.toLowerCase());
			} else {
				setUrl('https://pokeapi.co/api/v2/pokemon?limit=20');
				setFilter('');
			}
			console.log(pokemon.length)
			// noCache()

			let pokeList = pokemon ? pokemon.filter(e => { return e },
				pokemon.map(pokemon => (pokemon.name.includes(filter)))
			) : 'No pokemon';
			console.log(pokeList ? pokeList : 'Empty');

			clearInterval(check);
		}, 1000);
	};


	return (
		<>
			<form className='searchBar'>
				<div className='mb-4' style={{	display: 'flex'	}}>
					<FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', color: 'white', margin: '17px', zIndex: 1 }} />
					<input placeholder='Pokemon' className='form-control mx-auto' onChange={handleSearchChange} />
					<input type='submit' value='Search' className='form-control mx-auto searchButton btn-dark' />
				</div>
			</form>
			
			{pokemon ? (<>
				<Pagination prevAction={prevUrl ? prev : null} nextAction={nextUrl ? next : null} limit={url ? url.split('=').pop() : null} />

				<div className="row">
					{pokemon.map(pokemon => (pokemon.name.includes(filter) && <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />))}
				</div>
			</>) : (<Loading />)}
		</>
	);
}