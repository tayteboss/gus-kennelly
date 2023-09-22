import styled from 'styled-components';
import { PhotographyType, ProductionType, SiteSettingsType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import ProjectsDirectory from '../ProjectsDirectory';
import pxToRem from '../../../utils/pxToRem';

type StyledProps = {
	$hasVisited: boolean;
};

type Props = {
	photographyData: PhotographyType[];
	featuredPhotographyData: PhotographyType[];
	productionColour?: string;
	photographyColour: string;
	siteSettings: SiteSettingsType;
	hasVisited: boolean;
	isPhotographyFooter?: boolean;
	snippetData: ProductionType | PhotographyType | undefined;
	activeCategory: string;
	projectPills: ProductionType[] | PhotographyType[];
	productionIsActive: boolean;
	setProjectPills: (pills: ProductionType[] | PhotographyType[]) => void;
	setProductionIsActive: (productionIsActive: boolean) => void;
	setSnippetData: (data: ProductionType | PhotographyType) => void;
	setIsExpanded?: (isExpanded: boolean) => void;
	handleChangeCategory: (category: string) => void;
};

const ProjectsIndexWrapper = styled.div<StyledProps>`
	padding: ${pxToRem(16)} 0;
	opacity: ${(props) => (props.$hasVisited ? 1 : 0)};

	transition: all var(--transition-speed-extra-slow) var(--transition-ease);
`;

const ProjectsIndex = (props: Props) => {
	const {
		photographyData,
		featuredPhotographyData,
		productionColour,
		photographyColour,
		siteSettings,
		hasVisited,
		isPhotographyFooter = false,
		snippetData,
		activeCategory,
		projectPills,
		productionIsActive,
		setProjectPills,
		setProductionIsActive,
		setSnippetData,
		setIsExpanded,
		handleChangeCategory
	} = props;

	return (
		<ProjectsIndexWrapper $hasVisited={hasVisited}>
			<LayoutWrapper>
				<LayoutGrid>
					<ProjectsDirectory
						photographyData={photographyData}
						featuredPhotographyData={featuredPhotographyData}
						productionColour={productionColour}
						photographyColour={photographyColour}
						siteSettings={siteSettings}
						isPhotographyFooter={isPhotographyFooter}
						snippetData={snippetData}
						activeCategory={activeCategory}
						projectPills={projectPills}
						productionIsActive={productionIsActive}
						setProjectPills={setProjectPills}
						setProductionIsActive={setProductionIsActive}
						handleChangeProjectSnippet={(data) => setSnippetData(data)}
						setIsExpanded={setIsExpanded}
						handleChangeCategory={handleChangeCategory}
					/>
				</LayoutGrid>
			</LayoutWrapper>
		</ProjectsIndexWrapper>
	);
};

export default ProjectsIndex;
