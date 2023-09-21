import Link from 'next/link';
import styled from 'styled-components';
import ArrowSvg from '../../Svgs/ArrowSvg';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';

const LinkTag = styled.a`
	display: flex;
	align-items: center;
	column-gap: ${pxToRem(8)};
	text-decoration: none;
	margin-bottom: ${pxToRem(32)};

	svg {
		transform: rotate(-135deg);
	}
`;

const Title = styled.div``;

const BackHomeLink = () => {
	return (
		<LayoutWrapper>
			<Link href="/" passHref scroll={false}>
				<LinkTag>
					<Title>Back to home</Title>
					<ArrowSvg color="#000000" />
				</LinkTag>
			</Link>
		</LayoutWrapper>
	);
};

export default BackHomeLink;
