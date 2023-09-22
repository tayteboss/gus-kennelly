import styled from 'styled-components';
import { PhotographyType, ProductionType, SiteSettingsType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import PillsColumn from '../PillsColumn';

type Props = {
	photographyData: PhotographyType[];
	featuredPhotographyData: PhotographyType[];
	productionColour?: string;
	photographyColour: string;
	siteSettings: SiteSettingsType;
	isPhotographyFooter?: boolean;
	snippetData: ProductionType | PhotographyType | undefined;
	activeCategory: string;
	projectPills: ProductionType[] | PhotographyType[];
	productionIsActive: boolean;
	setProjectPills: (pills: ProductionType[] | PhotographyType[]) => void;
	setProductionIsActive: (productionIsActive: boolean) => void;
	handleChangeProjectSnippet: (project: ProductionType | PhotographyType) => void;
	setIsExpanded?: (isExpanded: boolean) => void;
	handleChangeCategory: (category: string) => void;
};

const ProjectsDirectoryWrapper = styled.div`
	grid-column: 1 / 7;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / -1;
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, minmax(0, 1fr));
	grid-column-gap: ${pxToRem(16)};
	align-items: start;
`;

const ProjectsDirectory = (props: Props) => {
	const {
		productionColour,
		photographyColour,
		isPhotographyFooter,
		snippetData,
		activeCategory,
		projectPills,
		productionIsActive,
		setProductionIsActive,
		handleChangeProjectSnippet,
		setIsExpanded,
		handleChangeCategory
	} = props;

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
					handleChangeCategory={handleChangeCategory}
				/>
				<PillsColumn
					isProjectsColumn
					projectPills={projectPills}
					productionIsActive={productionIsActive}
					productionColour={productionColour}
					photographyColour={photographyColour}
					activeProject={snippetData?.title}
					handleChangeProjectSnippet={handleChangeProjectSnippet}
					setIsExpanded={setIsExpanded}
				/>
			</Grid>
		</ProjectsDirectoryWrapper>
	);
};

export default ProjectsDirectory;
