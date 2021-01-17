import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
// Moved in PokemonList, might delete

export default class SearchBar extends Component {
	render() {
		return (
			<form className='searchBar'>
				<div className={this.props.className} style={{	display: 'flex'	}}>
					<FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', color: 'white', margin: '17px', zIndex: 1 }} />
					<input placeholder='Pokemon' className='form-control mx-auto' onChange={this.props.search} />
					<input type='submit' value='Search' className='form-control mx-auto searchButton btn-dark' />
				</div>
			</form>
		);
	}
}
