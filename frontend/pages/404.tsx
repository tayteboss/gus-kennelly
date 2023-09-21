import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import LayoutWrapper from '../components/common/LayoutWrapper';
import Link from 'next/link';
import pxToRem from '../utils/pxToRem';

const PageWrapper = styled.div`
	padding-top: ${pxToRem(16)};
`;

const Title = styled.h1`
	margin-bottom: ${pxToRem(8)};
`;

const LinkTag = styled.a``;

const Page = () => {
	return (
		<PageWrapper>
			<NextSeo
				title="Gus Kennelly - 404"
			/>
			<LayoutWrapper>
				<Title>Sorry, we couldn't find that page.</Title>
				<Link href="/" passHref>
					<LinkTag>Back home</LinkTag>
				</Link>
			</LayoutWrapper>
		</PageWrapper>
	)
}

export default Page;
