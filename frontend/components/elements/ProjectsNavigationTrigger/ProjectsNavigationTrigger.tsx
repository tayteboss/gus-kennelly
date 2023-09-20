import styled from 'styled-components';
import ArrowSvg from '../../Svgs/ArrowSvg';
import pxToRem from '../../../utils/pxToRem';

type StyledProps = {
	$hasNextProject?: boolean;
	$hasPreviousProject?: boolean;
};

type Props = {
	handleNextProject: () => void;
	handlePreviousProject: () => void;
	hasNextProject: boolean;
	hasPreviousProject: boolean;
};

const ProjectsNavigationTriggerWrapper = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: ${pxToRem(16)};
`;

const PreviousTrigger = styled.button<StyledProps>`
	color: var(--colour-white);
	display: flex;
	align-items: center;
	justify-content: flex-end;
	column-gap: ${pxToRem(8)};
	flex: 1;
	pointer-events: ${(props) => (props.$hasPreviousProject ? 'auto' : 'none')};
	opacity: ${(props) => (props.$hasPreviousProject ? 1 : 0.3)};

	transition: all var(--transition-speed-default) var(--transition-ease);

	.arrow-svg {
		transform: rotate(-135deg);

		transition: all var(--transition-speed-default) var(--transition-ease);
	}
`;

const NextTrigger = styled.button<StyledProps>`
	color: var(--colour-white);
	display: flex;
	align-items: center;
	column-gap: ${pxToRem(8)};
	flex: 1;
	pointer-events: ${(props) => (props.$hasNextProject ? 'auto' : 'none')};
	opacity: ${(props) => (props.$hasNextProject ? 1 : 0.3)};

	transition: all var(--transition-speed-default) var(--transition-ease);

	.arrow-svg {
		transform: rotate(45deg);

		transition: all var(--transition-speed-default) var(--transition-ease);
	}
`;

const ProjectsNavigationTrigger = (props: Props) => {
	const {
		hasNextProject,
		hasPreviousProject,
		handleNextProject,
		handlePreviousProject
	} = props;

	return (
		<ProjectsNavigationTriggerWrapper>
			<PreviousTrigger
				onClick={() => handlePreviousProject()}
				$hasPreviousProject={hasPreviousProject}
			>
				<ArrowSvg />
				Previous Project
			</PreviousTrigger>
			<NextTrigger
				onClick={() => handleNextProject()}
				$hasNextProject={hasNextProject}
			>
				Next Project
				<ArrowSvg />
			</NextTrigger>
		</ProjectsNavigationTriggerWrapper>
	);
};

export default ProjectsNavigationTrigger;
