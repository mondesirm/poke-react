import React from 'react';

export default function Pagination ({prevAction, nextAction}) {
	return (
		<div className="row">
			<div className="col d-flex">
				<button className='col-5 btn btn-dark' onClick={prevAction} style={ prevAction ? { visibility: 'visible' } : { visibility: 'hidden' } }>Previous</button>
				<div className="col-2 hide"></div>
				<button className='col-5 btn btn-dark' onClick={nextAction} style={ nextAction ? { visibility: 'visible' } : { visibility: 'hidden' } }>Next</button>
			</div>
		</div>
	);
}