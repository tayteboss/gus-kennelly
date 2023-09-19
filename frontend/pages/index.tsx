import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import client from '../client';
import { PhotographyType, ProductionType, SiteSettingsType } from '../shared/types/types';
import InformationSection from '../components/blocks/InformationSection';
import ProjectsIndex from '../components/blocks/ProjectsIndex';
import ProjectSnippet from '../components/blocks/ProjectSnippet';
import { useState } from 'react';

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

	// console.log('siteSettings', siteSettings);
	// console.log('productionData', productionData);
	console.log('featuredProductionData', featuredProductionData);
	console.log('photographyData', photographyData);

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
					setSnippetData={setSnippetData}
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
				/>
			</PageWrapper>
			<ProjectSnippet snippetData={snippetData} />
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
