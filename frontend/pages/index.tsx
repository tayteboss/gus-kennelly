import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import client from '../client';
import { SiteSettingsType } from '../shared/types/types';
import { useEffect, useState } from 'react';
import useBgColourUpdate from '../hooks/useBgColourUpdate';
import InformationSection from '../components/blocks/InformationSection';

const PageWrapper = styled.div``;

type Props = {
	siteSettings: SiteSettingsType;
	productionData: any;
	featuredProductionData: any;
	photographyData: any;
};

const Page = (props: Props) => {
	const {
		siteSettings,
		productionData,
		featuredProductionData,
		photographyData
	} = props;

	const [productionIsActive, setProductionIsActive] = useState(true);

	useBgColourUpdate(productionIsActive, siteSettings);

	console.log('siteSettings', siteSettings);
	// console.log('productionData', productionData);
	// console.log('featuredProductionData', featuredProductionData);
	// console.log('photographyData', photographyData);

	return (
		<PageWrapper>
			<NextSeo
				title={`Gus Kennelly | ${siteSettings?.tagline || ''}`}
				description={siteSettings?.seoDescription || ''}
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

	const featuredProductionDataQuery = `
		*[_type == 'production' && featured == true] | order(orderRank) [0...100] {
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
		}
	`;

	const siteSettings = await client.fetch(siteSettingsQuery);
	const productionData = await client.fetch(productionDataQuery);
	const featuredProductionData = await client.fetch(featuredProductionDataQuery);
	const photographyData = await client.fetch(photographyDataQuery);

	return {
		props: {
			siteSettings,
			productionData,
			featuredProductionData,
			photographyData
		},
	};
}

export default Page;
