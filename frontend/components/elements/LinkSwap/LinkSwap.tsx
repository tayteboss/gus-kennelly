import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	initial: string;
	swap: string;
	link: string;
};

const LinkTag = styled.a`
	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		margin-bottom: ${pxToRem(2)};
		display: inline-block;
	}
`;

const LinkSwap = (props: Props) => {
	const {
		initial,
		swap,
		link
	} = props;

	const [title, setTitle] = useState(initial);

	return (
		<Link href={link} passHref scroll={false}>
			<LinkTag
				onMouseOver={() => setTitle(swap)}
				onMouseOut={() => setTitle(initial)}
				target="_blank"
			>
				{title}
			</LinkTag>
		</Link>
	);
};

export default LinkSwap;
