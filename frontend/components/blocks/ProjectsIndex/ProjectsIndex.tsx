import styled from 'styled-components';
import { PhotographyType, ProductionType, SiteSettingsType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import ProjectsDirectory from '../ProjectsDirectory';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	productionData: ProductionType[];
	featuredProductionData: ProductionType[];
	photographyData: PhotographyType[];
	featuredPhotographyData: PhotographyType[];
	productionColour: string;
	photographyColour: string;
	siteSettings: SiteSettingsType;
	setSnippetData: (data: ProductionType | PhotographyType) => void;
	setIsExpanded: (isExpanded: boolean) => void;
};

const ProjectsIndexWrapper = styled.div`
	padding: ${pxToRem(16)} 0;
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
		setSnippetData,
		setIsExpanded
	} = props;

	return (
		<ProjectsIndexWrapper>
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
						handleChangeProjectSnippet={(data) => setSnippetData(data)}
						setIsExpanded={setIsExpanded}
					/>
				</LayoutGrid>
			</LayoutWrapper>
		</ProjectsIndexWrapper>
	);
};

export default ProjectsIndex;
