import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import client from '../client';
import { PhotographyType, ProductionType, SiteSettingsType } from '../shared/types/types';
import InformationSection from '../components/blocks/InformationSection';
import ProjectsIndex from '../components/blocks/ProjectsIndex';
import ProjectSnippet from '../components/blocks/ProjectSnippet';
import { useEffect, useState } from 'react';

const PageWrapper = styled.div`
	height: 100vh;

	transition: all var(--transition-speed-extra-slow) var(--transition-ease);
`;

type Props = {
	siteSettings: SiteSettingsType;
	productionData: ProductionType[];
	featuredProductionData: ProductionType[];
	photographyData: PhotographyType[];
	featuredPhotographyData: PhotographyType[];
};

const Page = (props: Props) => {
	const {
		siteSettings,
		productionData,
		featuredProductionData,
		photographyData,
		featuredPhotographyData
	} = props;

	const [snippetData, setSnippetData] = useState<ProductionType | PhotographyType>(featuredProductionData[0]);
	const [nextProject, setNextProject] = useState<ProductionType | undefined>(undefined);
	const [previousProject, setPreviousProject] = useState<ProductionType | undefined>(undefined);
	const [isExpanded, setIsExpanded] = useState(false);
	const [hasVisited, setHasVisited] = useState(false);

	const handleNextProject = () => {
		if (nextProject) {
			setSnippetData(nextProject);
		}
	};

	const handlePreviousProject = () => {
		if (previousProject) {
			setSnippetData(previousProject);
		}
	};

	useEffect(() => {
		if (snippetData) {
			const currentProjectIndex = productionData.findIndex((project: ProductionType) => project._id === snippetData._id);
			const nextProject = productionData[currentProjectIndex + 1];
			const previousProject = productionData[currentProjectIndex - 1];

			setNextProject(nextProject);
			setPreviousProject(previousProject);

			if (nextProject) {
				const nextProjectMedia = nextProject.media.asset.playbackId;
				const nextProjectSnippet = nextProject.snippet.asset.playbackId;

				const nextProjectMediaPreload = document.createElement('link');
				nextProjectMediaPreload.rel = 'preload';
				nextProjectMediaPreload.as = 'video';
				nextProjectMediaPreload.href = `https://stream.mux.com/${nextProjectMedia}.m3u8`;
				document.head.appendChild(nextProjectMediaPreload);

				const nextProjectSnippetPreload = document.createElement('link');
				nextProjectSnippetPreload.rel = 'preload';
				nextProjectSnippetPreload.as = 'video';
				nextProjectSnippetPreload.href = `https://stream.mux.com/${nextProjectSnippet}.m3u8`;
				document.head.appendChild(nextProjectSnippetPreload);
			}

			// if there is a previous project, preload it
			if (previousProject) {
				const previousProjectMedia = previousProject.media.asset.playbackId;
				const previousProjectSnippet = previousProject.snippet.asset.playbackId;

				const previousProjectMediaPreload = document.createElement('link');
				previousProjectMediaPreload.rel = 'preload';
				previousProjectMediaPreload.as = 'video';
				previousProjectMediaPreload.href = `https://stream.mux.com/${previousProjectMedia}.m3u8`;
				document.head.appendChild(previousProjectMediaPreload);

				const previousProjectSnippetPreload = document.createElement('link');
				previousProjectSnippetPreload.rel = 'preload';
				previousProjectSnippetPreload.as = 'video';
				previousProjectSnippetPreload.href = `https://stream.mux.com/${previousProjectSnippet}.m3u8`;
				document.head.appendChild(previousProjectSnippetPreload);
			}
		}
	}, [snippetData]);

	// console.log('siteSettings', siteSettings);
	// console.log('productionData', productionData);
	// console.log('featuredProductionData', featuredProductionData);
	// console.log('photographyData', photographyData);

	return (
		<>
			<PageWrapper className="page-wrapper">
				<NextSeo
					title={`Gus Kennelly | ${siteSettings?.tagline || ''}`}
					description={siteSettings?.seoDescription || ''}
				/>
				<ProjectsIndex
					productionData={productionData}
					featuredProductionData={featuredProductionData}
					photographyData={photographyData}
					featuredPhotographyData={featuredPhotographyData}
					productionColour={siteSettings?.productionColour?.hex}
					photographyColour={siteSettings?.photographyColour?.hex}
					siteSettings={siteSettings}
					hasVisited={hasVisited}
					setSnippetData={setSnippetData}
					setIsExpanded={setIsExpanded}
				/>
				<InformationSection
					tagline={siteSettings?.tagline}
					email={siteSettings?.email}
					phone={siteSettings?.phone}
					instagram={siteSettings?.instagram}
					instagramHandle={siteSettings?.instagramHandle}
					aoc={siteSettings?.aoc}
					availableForWork={siteSettings?.availableForWork}
					about={siteSettings?.about}
					hasVisited={hasVisited}
					setHasVisited={setHasVisited}
				/>
			</PageWrapper>
			<ProjectSnippet
				snippetData={snippetData}
				isExpanded={isExpanded}
				hasVisited={hasVisited}
				hasNextProject={!!nextProject}
				hasPreviousProject={!!previousProject}
				setIsExpanded={setIsExpanded}
				handleNextProject={handleNextProject}
				handlePreviousProject={handlePreviousProject}
			/>
		</>
	);
};

export async function getStaticProps() {
	const siteSettingsQuery = `
		*[_type == 'siteSettings'][0] {
			...,
		}
	`;

	const productionDataQuery = `
		*[_type == 'production'] | order(orderRank) [0...100] {
			...,
			media{asset->},
			snippet{asset->}
		}
	`;

	const photographyDataQuery = `
		*[_type == 'photography'] | order(orderRank) [0...100] {
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

	const siteSettings = await client.fetch(siteSettingsQuery);
	const productionData = await client.fetch(productionDataQuery);
	const photographyData = await client.fetch(photographyDataQuery);

	const featuredProductionData = productionData.filter((project: any) => project.featured);
	const featuredPhotographyData = photographyData.filter((project: any) => project.featured);

	return {
		props: {
			siteSettings,
			productionData,
			featuredProductionData,
			photographyData,
			featuredPhotographyData
		},
	};
}

export default Page;
