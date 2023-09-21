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
	productionData?: ProductionType[];
	featuredProductionData?: ProductionType[];
	photographyData: PhotographyType[];
	featuredPhotographyData: PhotographyType[];
	productionColour?: string;
	photographyColour: string;
	siteSettings: SiteSettingsType;
	hasVisited: boolean;
	isPhotographyFooter?: boolean;
	setSnippetData: (data: ProductionType | PhotographyType) => void;
	setIsExpanded?: (isExpanded: boolean) => void;
};

const ProjectsIndexWrapper = styled.div<StyledProps>`
	padding: ${pxToRem(16)} 0;
	opacity: ${(props) => (props.$hasVisited ? 1 : 0)};

	transition: all var(--transition-speed-extra-slow) var(--transition-ease);
`;

const ProjectsIndex = (props: Props) => {
	const {
		productionData,
		featuredProductionData,
		photographyData,
		featuredPhotographyData,
		productionColour,
		photographyColour,
		siteSettings,
		hasVisited,
		isPhotographyFooter = false,
		setSnippetData,
		setIsExpanded
	} = props;

	return (
		<ProjectsIndexWrapper $hasVisited={hasVisited}>
			<LayoutWrapper>
				<LayoutGrid>
					<ProjectsDirectory
						productionData={productionData}
						featuredProductionData={featuredProductionData}
						photographyData={photographyData}
						featuredPhotographyData={featuredPhotographyData}
						productionColour={productionColour}
						photographyColour={photographyColour}
						siteSettings={siteSettings}
						isPhotographyFooter={isPhotographyFooter}
						handleChangeProjectSnippet={(data) => setSnippetData(data)}
						setIsExpanded={setIsExpanded}
					/>
				</LayoutGrid>
			</LayoutWrapper>
		</ProjectsIndexWrapper>
	);
};

export default ProjectsIndex;
