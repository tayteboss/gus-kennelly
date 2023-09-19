import { useState } from 'react';
import styled from 'styled-components';

const Link = styled.a``;

const Credit = () => {

	const [title, setTitle] = useState("tayte.co");

	return (
		<Link
			href="https://tayte.co/"
			target="_blank"
			onMouseOver={() => setTitle('Design + Development')}
			onMouseOut={() => setTitle('tayte.co')}
		>
			{title}
		</Link>
	);
};

export default Credit;
