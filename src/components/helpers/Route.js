import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);
	
	useEffect(() => {
		const onLocationChange = () => {
			setCurrentPath(window.location.pathname);
		}
		window.addEventListener('popstate', onLocationChange);
		return () => {
			window.removeEventListener('popstate', onLocationChange);
		};
	}, []);

	var regex = /(\/pokemon)+(\/)+[0-9]+$/;

	if (currentPath.match(regex) != null && path === '/pokemon') {
		var res = currentPath.match(regex);
		var str = res == null ? null : res[0];
		return currentPath === str ? children : null;
	}
	
	return currentPath === path ? children : null;
}
	
export default Route;