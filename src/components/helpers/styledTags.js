import styled from 'styled-components';

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

export default Card;