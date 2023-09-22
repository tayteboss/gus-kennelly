import styled from 'styled-components';
import ProjectsIndex from '../ProjectsIndex';
import { useEffect, useRef, useState } from 'react';
import { PhotographyType, ProductionType, SiteSettingsType } from '../../../shared/types/types';
import PhotographyBottomFooter from '../PhotographyBottomFooter';
import ProjectSnippet from '../ProjectSnippet';
import BackHomeLink from '../../elements/BackHomeLink';
import pxToRem from '../../../utils/pxToRem';

type StyledProps = {
	$bgColour?: string;
	$topSectionHeight?: number;
};

type Props = {
	bgColour: string;
	featuredPhotographyData: PhotographyType[];
	photographyData: PhotographyType[];
	siteSettings: SiteSettingsType;
};

const PhotographyFooterWrapper = styled.div<StyledProps>`
	background: ${(props: any) => props.$bgColour};
	padding: ${pxToRem(16)} 0;
`;

const TopSection = styled.div<StyledProps>`
	position: relative;
	margin-bottom: ${(props) => `calc(var(--ratio-height) - ${props.$topSectionHeight}px)`};
`;

const PhotographyFooter = (props: Props) => {
	const {
		bgColour,
		featuredPhotographyData,
		photographyData,
		siteSettings
	} = props;

	const [topSectionHeight, setTopSectionHeight] = useState(0);
	const [snippetData, setSnippetData] = useState<ProductionType | PhotographyType | undefined>(featuredPhotographyData ? featuredPhotographyData[0] : undefined);
	const [productionIsActive, setProductionIsActive] = useState(false);
	const [activeCategory, setActiveCategory] = useState('featured');
	const [projectPills, setProjectPills] = useState<ProductionType[] | PhotographyType[]>(featuredPhotographyData);

	const ref = useRef<HTMLDivElement>(null);

	const format = (string: string) => {
		return string.toLowerCase().replace(/\s/g, '-');
	};

	const handleChangeCategory = (category: string) => {
		setActiveCategory(category);
	}

	// Reset state when productionIsActive changes
	useEffect(() => {
		const initialCategory = 'featured';
		const initialData = featuredPhotographyData;
		if (!initialData) return;

		setActiveCategory(initialCategory);
		setProjectPills(initialData);
		setSnippetData(initialData[0]);
	}, [productionIsActive]);

	// Handle changes in activeCategory
	useEffect(() => {
		if (activeCategory === 'featured') {
			const initialData = featuredPhotographyData;
			if (!initialData) return;

			setProjectPills(initialData);
			setSnippetData(initialData[0]);
		} else {
			// Filter projects by category
			const filteredProjects = photographyData.filter((project) => project.category == format(activeCategory))
		
			if (filteredProjects?.length > 0) {
				setProjectPills(filteredProjects);
				setSnippetData(filteredProjects[0]);
			}
		}
	}, [activeCategory, productionIsActive]);

	useEffect(() => {
		if (ref.current) {
			setTopSectionHeight(ref.current.clientHeight);
		}
	}, []);

	return (
		<PhotographyFooterWrapper $bgColour={bgColour}>
			<TopSection
				ref={ref}
				$topSectionHeight={topSectionHeight}
			>
				<ProjectsIndex
					photographyData={photographyData}
					featuredPhotographyData={featuredPhotographyData}
					productionColour={siteSettings?.productionColour?.hex}
					photographyColour={siteSettings?.photographyColour?.hex}
					siteSettings={siteSettings}
					hasVisited={true}
					snippetData={snippetData}
					activeCategory={activeCategory}
					projectPills={projectPills}
					productionIsActive={productionIsActive}
					isPhotographyFooter={true}
					setProductionIsActive={setProductionIsActive}
					setSnippetData={setSnippetData}
					setProjectPills={setProjectPills}
					handleChangeCategory={handleChangeCategory}
				/>
				<ProjectSnippet
					snippetData={snippetData}
					hasVisited={true}
				/>
			</TopSection>
			<BackHomeLink />
			<PhotographyBottomFooter siteSettings={siteSettings} />
		</PhotographyFooterWrapper>
	);
};

export default PhotographyFooter;
