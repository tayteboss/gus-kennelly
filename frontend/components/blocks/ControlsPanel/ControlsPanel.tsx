import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import CreditsTrigger from '../../elements/CreditsTrigger';
import ProjectsNavigationTrigger from '../../elements/ProjectsNavigationTrigger';
import CloseProjectTrigger from '../../elements/CloseProjectTrigger';

type Props = {
	creditsIsActive: boolean;
	setCreditsIsActive: (creditsIsActive: boolean) => void;
	setIsExpanded: (isExpanded: boolean) => void;
};

const ControlsPanelWrapper = styled.div`
	width: 100%;
	height: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: ${pxToRem(16)};
`;

const TopBar = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ControlsPanel = (props: Props) => {
	const {
		creditsIsActive,
		setCreditsIsActive,
		setIsExpanded
	} = props;

	return (
		<ControlsPanelWrapper>
			<TopBar>
				<CreditsTrigger
					creditsIsActive={creditsIsActive}
					setCreditsIsActive={setCreditsIsActive}
				/>
				<ProjectsNavigationTrigger />
				<CloseProjectTrigger setIsExpanded={setIsExpanded} />
			</TopBar>
		</ControlsPanelWrapper>
	);
};

export default ControlsPanel;
