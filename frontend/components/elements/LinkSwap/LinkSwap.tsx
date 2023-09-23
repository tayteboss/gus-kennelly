import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	initial: string;
	swap: string;
	link: string;
	isMobile: boolean;
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
		link,
		isMobile
	} = props;

	const [title, setTitle] = useState(initial);

	return (
		<Link href={link} passHref scroll={false}>
			<LinkTag
				onMouseOver={() => setTitle(swap)}
				onMouseOut={() => setTitle(initial)}
				target="_blank"
			>
				{isMobile ? initial : title}
			</LinkTag>
		</Link>
	);
};

export default LinkSwap;
