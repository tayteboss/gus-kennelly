import styled from 'styled-components';
import client from '../../client';
import { PhotographyType, SiteSettingsType, Transitions } from '../../shared/types/types';
import ProjectHeader from '../../components/blocks/ProjectHeader';
import PhotographyGallery from '../../components/blocks/PhotographyGallery';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PhotographyFooter from '../../components/blocks/PhotographyFooter';
import { motion } from 'framer-motion';
import useViewportWidth from '../../hooks/useViewportWidth';

type StyledProps = {
	$bgColour: string;
}

type Props = {
	data: PhotographyType;
	allPhotographyData: PhotographyType[];
	siteSettings: SiteSettingsType;
	featuredPhotographyData: PhotographyType[];
	pageTransitionVariants: Transitions;
};

const PageWrapper = styled(motion.div)<StyledProps>`
	background-color: ${(props: any) => props.$bgColour};
`;

const Page = (props: Props) => {
	const {
		data,
		allPhotographyData,
		featuredPhotographyData,
		siteSettings,
		pageTransitionVariants
	} = props;

	const [nextProjectSlug, setNextProjectSlug] = useState('');
	const [previousProjectSlug, setPreviousProjectSlug] = useState('');
	const [isMobile, setIsMobile] = useState(false);
	const [num, setNum] = useState(0);

	const viewportWidth = useViewportWidth();
	const router = useRouter();

	const handleNextProject = () => {
		if (nextProjectSlug) {
			router.push(`/photography/${nextProjectSlug}`);
		}
	};

	const handlePreviousProject = () => {
		if (previousProjectSlug) {
			router.push(`/photography/${previousProjectSlug}`);
		}
	};

	useEffect(() => {
		if (viewportWidth === 'mobile') {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [viewportWidth]);

	useEffect(() => {
		if (data) {
			const currentProjectIndex = allPhotographyData.findIndex((project: PhotographyType) => project._id === data._id);
			const nextProject = allPhotographyData[currentProjectIndex + 1];
			const previousProject = allPhotographyData[currentProjectIndex - 1];

			setNextProjectSlug(nextProject?.slug?.current);
			setPreviousProjectSlug(previousProject?.slug?.current);
		}
	}, [data]);

	useEffect(() => {
		setNum(num + 1);
	}, [router]);

	return (
		<PageWrapper
			$bgColour={siteSettings?.photographyColour?.hex}
			variants={pageTransitionVariants}
			initial='hidden'
			animate='visible'
			exit='hidden'
			key={num}
		>
			<NextSeo
				title={`Gus Kennelly | ${data?.title || ''}}`}
				description={siteSettings?.seoDescription || ''}
			/>
			<ProjectHeader
				handleNextProject={handleNextProject}
				handlePreviousProject={handlePreviousProject}
				hasNextProject={nextProjectSlug?.length > 0}
				hasPreviousProject={previousProjectSlug?.length > 0}
				data={data}
				bgColour={siteSettings?.photographyColour?.hex}
				isMobile={isMobile}
			/>
			<PhotographyGallery data={data} />
			<PhotographyFooter
				bgColour={siteSettings?.photographyColour?.hex}
				featuredPhotographyData={featuredPhotographyData}
				photographyData={allPhotographyData}
				siteSettings={siteSettings}
			/>
		</PageWrapper>
	);
};

export async function getStaticPaths() {
	const allPhotographyQuery = `
		*[_type == 'photography'] [0...100] {
			slug
		}
	`;

	const allPhotography = await client.fetch(allPhotographyQuery);

	return {
		paths: allPhotography.map((item: any) => {
			return `/photography/${item?.slug?.current}`;
		}),
		fallback: true
	};
};

export async function getStaticProps({ params }: any) {
	const allPhotographyQuery = `
		*[_type == 'photography'] | order(orderRank) [0...100] {
			_id,
			title,
			slug,
			category,
			featured,
			'featuredImage': featuredImage.asset->url,
		}
	`;

	const photographyQuery = `
		*[_type == 'photography' && slug.current == "${params.slug[0]}"][0] {
			...,
			'imageGallery': imageGallery[] {
				_key,
				imageType,
				'singleImageUrl': singleImage.asset->url,
				'twoImagesUrls': twoImages[].asset->url,
				'useLandscapeImage': useLandscapeImage,
			},
			'featuredImage': featuredImage.asset->url,
		}
	`;

	const siteSettingsQuery = `
		*[_type == 'siteSettings'][0] {
			...,
		}
	`;

	const data = await client.fetch(photographyQuery);
	const allPhotographyData = await client.fetch(allPhotographyQuery);
	const siteSettings = await client.fetch(siteSettingsQuery);

	const featuredPhotographyData = allPhotographyData.filter((project: any) => project.featured);

	return {
		props: {
			data,
			allPhotographyData,
			featuredPhotographyData,
			siteSettings,
		},
	};
}

export default Page;
