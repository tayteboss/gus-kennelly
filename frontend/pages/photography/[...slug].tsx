import styled from 'styled-components';
import client from '../../client';
import { PhotographyType, SiteSettingsType } from '../../shared/types/types';
import ProjectHeader from '../../components/blocks/ProjectHeader';
import PhotographyGallery from '../../components/blocks/PhotographyGallery';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
	data: PhotographyType;
	allPhotographyData: PhotographyType[];
	siteSettings: SiteSettingsType;
};

const PageWrapper = styled.div``;

const Page = (props: Props) => {
	const {
		data,
		allPhotographyData,
		siteSettings
	} = props;

	const [nextProjectSlug, setNextProjectSlug] = useState('');
	const [previousProjectSlug, setPreviousProjectSlug] = useState('');

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
		if (data) {
			const currentProjectIndex = allPhotographyData.findIndex((project: PhotographyType) => project._id === data._id);
			const nextProject = allPhotographyData[currentProjectIndex + 1];
			const previousProject = allPhotographyData[currentProjectIndex - 1];

			setNextProjectSlug(nextProject?.slug?.current);
			setPreviousProjectSlug(previousProject?.slug?.current);
		}
	}, [data]);

	return (
		<PageWrapper>
			<NextSeo
				title={`Gus Kennelly | ${data?.title || ''}}`}
				description={siteSettings?.seoDescription || ''}
			/>
			<ProjectHeader
				handleNextProject={handleNextProject}
				handlePreviousProject={handlePreviousProject}
				hasNextProject={nextProjectSlug.length > 0}
				hasPreviousProject={previousProjectSlug.length > 0}
				data={data}
			/>
			<PhotographyGallery />
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
			return `/photography/${item?.slug}`;
		}),
		fallback: true
	};
};

export async function getStaticProps({ params }: any) {
	const allPhotographyQuery = `
		*[_type == 'photography'] [0...100] {
			_id,
			slug
		}
	`;

	const photographyQuery = `
		*[_type == 'photography' && slug.current == "${params.slug[0]}"][0] {
			...,
			imageGallery[] {
				...,
				_type == "image" => {
					asset->
				},
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

	return {
		props: {
			data,
			allPhotographyData,
			siteSettings,
		},
	};
}

export default Page;
