import styled from 'styled-components';
import ArrowSvg from '../../Svgs/ArrowSvg';
import pxToRem from '../../../utils/pxToRem';

const ProjectsNavigationTriggerWrapper = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: ${pxToRem(16)};
`;

const PreviousTrigger = styled.button`
	color: var(--colour-white);
	display: flex;
	align-items: center;
	justify-content: flex-end;
	column-gap: ${pxToRem(8)};
	flex: 1;

	.arrow-svg {
		transform: rotate(-135deg);

		transition: all var(--transition-speed-default) var(--transition-ease);
	}
`;

const NextTrigger = styled.button`
	color: var(--colour-white);
	display: flex;
	align-items: center;
	column-gap: ${pxToRem(8)};
	flex: 1;

	.arrow-svg {
		transform: rotate(45deg);

		transition: all var(--transition-speed-default) var(--transition-ease);
	}
`;

const ProjectsNavigationTrigger = () => {
	return (
		<ProjectsNavigationTriggerWrapper>
			<PreviousTrigger>
				<ArrowSvg />
				Previous Project
			</PreviousTrigger>
			<NextTrigger>
				Next Project
				<ArrowSvg />
			</NextTrigger>
		</ProjectsNavigationTriggerWrapper>
	);
};

export default ProjectsNavigationTrigger;
