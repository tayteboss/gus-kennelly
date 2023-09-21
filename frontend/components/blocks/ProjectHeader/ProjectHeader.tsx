import styled from 'styled-components';
import ProjectsNavigationTrigger from '../../elements/ProjectsNavigationTrigger';
import CreditsTrigger from '../../elements/CreditsTrigger';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import CloseProjectTrigger from '../../elements/CloseProjectTrigger';
import { useState } from 'react';
import PhotographyCreditsPanel from '../PhotographyCreditsPanel';
import { PhotographyType } from '../../../shared/types/types';

type Props = {
	hasNextProject: boolean;
	hasPreviousProject: boolean;
	data: PhotographyType;
	handleNextProject: () => void;
	handlePreviousProject: () => void;
}

const ProjectHeaderWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background: var(--colour-white);
`;

const Inner = styled.div`
	display: flex;
	justify-content: space-between;
	padding: ${pxToRem(16)} 0;
`;

const ProjectHeader = (props: Props) => {
	const {
		hasNextProject,
		hasPreviousProject,
		data,
		handleNextProject,
		handlePreviousProject,
	} = props;

	const [creditsIsActive, setCreditsIsActive] = useState(false);

	return (
		<ProjectHeaderWrapper>
			<LayoutWrapper>
				<Inner>
					<CreditsTrigger
						creditsIsActive={creditsIsActive}
						setCreditsIsActive={setCreditsIsActive}
						isPhotographyType
					/>
					<ProjectsNavigationTrigger
						handleNextProject={handleNextProject}
						handlePreviousProject={handlePreviousProject}
						hasNextProject={hasNextProject}
						hasPreviousProject={hasPreviousProject}
						isPhotographyType
					/>
					<CloseProjectTrigger
						isPhotographyType
					/>
				</Inner>
			</LayoutWrapper>
			<PhotographyCreditsPanel
				data={data}
				creditsIsActive={creditsIsActive}
			/>
		</ProjectHeaderWrapper>
	);
};

export default ProjectHeader;
