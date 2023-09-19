import { useState } from 'react';
import styled from 'styled-components';

const Link = styled.a``;

const Credit = () => {

	const [title, setTitle] = useState("Credits");

	return (
		<Link
			href="https://tayte.co/"
			target="_blank"
			onMouseOver={() => setTitle('tayte.co')}
			onMouseOut={() => setTitle('Credits')}
		>
			{title}
		</Link>
	);
};

export default Credit;
