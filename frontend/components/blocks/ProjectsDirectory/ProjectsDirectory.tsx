import styled from 'styled-components';
import { PhotographyType, ProductionType, SiteSettingsType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { useEffect, useState } from 'react';
import useBgColourUpdate from '../../../hooks/useBgColourUpdate';
import PillsColumn from '../PillsColumn';

type Props = {
	productionData?: ProductionType[];
	featuredProductionData?: ProductionType[];
	photographyData: PhotographyType[];
	featuredPhotographyData: PhotographyType[];
	productionColour?: string;
	photographyColour: string;
	siteSettings: SiteSettingsType;
	isPhotographyFooter?: boolean;
	handleChangeProjectSnippet: (project: ProductionType | PhotographyType) => void;
	setIsExpanded?: (isExpanded: boolean) => void;
};

const ProjectsDirectoryWrapper = styled.div`
	grid-column: 1 / 7;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, minmax(0, 1fr));
	grid-column-gap: ${pxToRem(16)};
	align-items: start;
`;

const ProjectsDirectory = (props: Props) => {
	const {
		productionData,
		featuredProductionData,
		photographyData,
		featuredPhotographyData,
		productionColour,
		photographyColour,
		siteSettings,
		isPhotographyFooter,
		handleChangeProjectSnippet,
		setIsExpanded
	} = props;

	const [productionIsActive, setProductionIsActive] = useState(isPhotographyFooter ? false : true);
	const [activeCategory, setActiveCategory] = useState('Featured');
	const [activeProject, setActiveProject] = useState<string>(featuredProductionData ? featuredProductionData[0].title : featuredPhotographyData[0].title);
	const [projectPills, setProjectPills] = useState<ProductionType[] | PhotographyType[] | undefined>(featuredProductionData ? featuredProductionData : featuredPhotographyData);

	useBgColourUpdate(productionIsActive, siteSettings);

	const format = (string: string) => {
		return string.toLowerCase().replace(/\s/g, '-');
	};

	// when project type is changed, reset active category and project
	useEffect(() => {
		setActiveCategory('Featured');
		setProjectPills(productionIsActive ? featuredProductionData : featuredPhotographyData);
		setActiveProject(productionIsActive ? featuredProductionData[0].title : featuredPhotographyData[0].title);
		productionIsActive ? handleChangeProjectSnippet(featuredProductionData[0]) : handleChangeProjectSnippet(featuredPhotographyData[0]);
	}, [productionIsActive]);

	// when active category is changed, reset active project and set project pills
	useEffect(() => {
		if (activeCategory === 'Featured') {
			setProjectPills(productionIsActive ? featuredProductionData : featuredPhotographyData);
			setActiveProject(productionIsActive ? featuredProductionData[0].title : featuredPhotographyData[0].title);
			productionIsActive ? handleChangeProjectSnippet(featuredProductionData[0]) : handleChangeProjectSnippet(featuredPhotographyData[0]);
		} else {
			// filter projects by category
			const filteredProjects = productionIsActive
				? productionData.filter((project) => project.category === format(activeCategory))
				: photographyData.filter((project) => project.category === format(activeCategory))
			;

			setProjectPills(filteredProjects);
			setActiveProject(filteredProjects[0].title);
			handleChangeProjectSnippet(filteredProjects[0]);
		}
	}, [activeCategory]);

	return (
		<ProjectsDirectoryWrapper>
			<Grid>
				<PillsColumn
					isProjectTypeColumn
					productionIsActive={productionIsActive}
					productionColour={productionColour}
					photographyColour={photographyColour}
					isPhotographyFooter={isPhotographyFooter}
					handleChangeProjectType={
						(isProduction: boolean) => setProductionIsActive(isProduction)
					}
				/>
				<PillsColumn
					isCategoryColumn
					productionIsActive={productionIsActive}
					productionColour={productionColour}
					photographyColour={photographyColour}
					activeCategory={activeCategory}
					handleChangeCategory={
						(category: string) => setActiveCategory(category)
					}
				/>
				<PillsColumn
					isProjectsColumn
					projectPills={projectPills}
					productionIsActive={productionIsActive}
					productionColour={productionColour}
					photographyColour={photographyColour}
					activeProject={activeProject}
					handleChangeProject={
						(project: string) => setActiveProject(project)
					}
					handleChangeProjectSnippet={handleChangeProjectSnippet}
					setIsExpanded={setIsExpanded}
				/>
			</Grid>
		</ProjectsDirectoryWrapper>
	);
};

export default ProjectsDirectory;
