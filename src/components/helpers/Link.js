import React from 'react';

const Link = ({ className, to, children }) => {
	
	const onClick = (event) => {
		// if ctrl or meta key are held on click, allow default behavior of opening link in new tab
		if (event.metaKey || event.ctrlKey) { return }
		// prevent full page reload
		event.preventDefault()
		// update url
		window.history.pushState({}, '', to);
		// communicate to Routes that URL has changed
		const navEvent = new PopStateEvent('popstate')
		window.dispatchEvent(navEvent)
	};
	
	return (<a className={className} href={to} onClick={onClick}>{children}</a>)
}
	
export default Link;