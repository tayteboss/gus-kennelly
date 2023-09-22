import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import client from '../client';
import { PhotographyType, ProductionType, SiteSettingsType, Transitions } from '../shared/types/types';
import InformationSection from '../components/blocks/InformationSection';
import ProjectsIndex from '../components/blocks/ProjectsIndex';
import ProjectSnippet from '../components/blocks/ProjectSnippet';
import { useEffect, useState } from 'react';
import useBgColourUpdate from '../hooks/useBgColourUpdate';
import { motion } from 'framer-motion';

const PageWrapper = styled(motion.div)`
	height: 100vh;

	transition: all var(--transition-speed-extra-slow) var(--transition-ease);
`;

type Props = {
	siteSettings: SiteSettingsType;
	productionData: ProductionType[];
	featuredProductionData: ProductionType[];
	photographyData: PhotographyType[];
	featuredPhotographyData: PhotographyType[];
	pageTransitionVariants: Transitions;
};

const Page = (props: Props) => {
	const {
		siteSettings,
		productionData,
		featuredProductionData,
		photographyData,
		featuredPhotographyData,
		pageTransitionVariants
	} = props;

	const [snippetData, setSnippetData] = useState<ProductionType | PhotographyType>(featuredProductionData[0]);
	const [nextProject, setNextProject] = useState<ProductionType | undefined>(undefined);
	const [previousProject, setPreviousProject] = useState<ProductionType | undefined>(undefined);
	const [isExpanded, setIsExpanded] = useState<boolean | undefined>(false);
	const [hasVisited, setHasVisited] = useState(false);
	const [productionIsActive, setProductionIsActive] = useState(true);
	const [activeCategory, setActiveCategory] = useState('featured');
	const [projectPills, setProjectPills] = useState<ProductionType[] | PhotographyType[]>(featuredProductionData || featuredPhotographyData || []);

	useBgColourUpdate(productionIsActive, siteSettings);

	const format = (string: string) => {
		return string.toLowerCase().replace(/\s/g, '-');
	};

	const handleChangeCategory = (category: string) => {
		setActiveCategory(category);
	}

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

	// Reset state when productionIsActive changes
	useEffect(() => {
		const initialCategory = 'featured';
		const initialData = productionIsActive ? featuredProductionData : featuredPhotographyData;
		if (!initialData) return;

		setActiveCategory(initialCategory);
		setProjectPills(initialData);
		setSnippetData(initialData[0]);
	}, [productionIsActive]);

	// Handle changes in activeCategory
	useEffect(() => {
		if (activeCategory === 'featured') {
			const initialData = productionIsActive ? featuredProductionData : featuredPhotographyData;
			if (!initialData) return;

			setProjectPills(initialData);
			setSnippetData(initialData[0]);
		} else {
			// Filter projects by category
			const filteredProjects = productionIsActive
				? productionData.filter((project) => project.category == format(activeCategory))
				: photographyData.filter((project) => project.category == format(activeCategory));
		
			if (filteredProjects.length > 0) {
				setProjectPills(filteredProjects);
				setSnippetData(filteredProjects[0]);
			}
		}
	}, [activeCategory, productionIsActive]);

	// Handling next / prev projects when snippetData changes
	useEffect(() => {
		if (snippetData) {
			const currentProjectIndex = projectPills.findIndex((project: any) => project._id === snippetData._id);
			const nextProject: any = projectPills[currentProjectIndex + 1];
			const previousProject: any = projectPills[currentProjectIndex - 1];

			setNextProject(nextProject);
			setPreviousProject(previousProject);

			if (nextProject) {
				const nextProjectMedia = nextProject?.media?.asset?.playbackId;
				const nextProjectSnippet = nextProject?.snippet?.asset?.playbackId;

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
				const previousProjectMedia = previousProject?.media?.asset?.playbackId;
				const previousProjectSnippet = previousProject?.snippet?.asset?.playbackId;

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

	return (
		<>
			<PageWrapper
				className="page-wrapper"
				variants={pageTransitionVariants}
				initial='hidden'
				animate='visible'
				exit='hidden'
			>
				<NextSeo
					title={`Gus Kennelly | ${siteSettings?.tagline || ''}`}
					description={siteSettings?.seoDescription || ''}
				/>
				<ProjectsIndex
					photographyData={photographyData}
					featuredPhotographyData={featuredPhotographyData}
					productionColour={siteSettings?.productionColour?.hex}
					photographyColour={siteSettings?.photographyColour?.hex}
					siteSettings={siteSettings}
					hasVisited={hasVisited}
					snippetData={snippetData}
					activeCategory={activeCategory}
					projectPills={projectPills}
					productionIsActive={productionIsActive}
					setProductionIsActive={setProductionIsActive}
					setSnippetData={setSnippetData}
					setIsExpanded={setIsExpanded}
					setProjectPills={setProjectPills}
					handleChangeCategory={handleChangeCategory}
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
