import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { PhotographyType, ProductionType } from '../../../shared/types/types';
import ArrowSvg from '../../Svgs/ArrowSvg';

type StyledProps = {
	$isActive: boolean;
	$activeColour: string;
};

type Props = {
	title: string;
	isActive: boolean;
	activeColour: string;
	isProjectType?: boolean;
	isCategory?: boolean;
	isProject?: boolean;
	projectData?: any;
	handleChangeProjectType?: (isProduction: boolean) => void;
	handleChangeCategory?: (category: string) => void;
	handleChangeProject?: (project: string) => void;
	handleChangeProjectSnippet?: (project: ProductionType | PhotographyType) => void;
	setIsExpanded?: (isExpanded: boolean) => void;
};

const PillWrapper = styled.button<StyledProps>`
	border: 1px solid transparent;
	color: ${(props) => props.$isActive ? props.$activeColour : 'var(--colour-black)'};
	background: ${(props) => props.$isActive ? 'var(--colour-black)' : 'transparent'};
	border-radius: 100px;
	width: 100%;
	text-align: left;
	padding: 0 ${pxToRem(8)};
	display: flex;
	align-items: center;
	justify-content: space-between;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		border-color: var(--colour-black);
	}
`;

const Pill = (props: Props) => {
	const {
		title,
		isActive,
		activeColour,
		isProjectType,
		isCategory,
		isProject,
		projectData,
		handleChangeProjectType,
		handleChangeCategory,
		handleChangeProject,
		handleChangeProjectSnippet,
		setIsExpanded
	} = props;

	const handleClick = () => {
		if (isProjectType && handleChangeProjectType) {
			handleChangeProjectType(title === 'Production');
		}

		if (isCategory && handleChangeCategory) {
			handleChangeCategory(title);
		}

		if (isProject && handleChangeProject && handleChangeProjectSnippet) {
			if (isActive && setIsExpanded) {
				setIsExpanded(true);
			} else {
				handleChangeProject(title);
				handleChangeProjectSnippet(projectData)
			}
		}
	}

	return (
		<PillWrapper
			$isActive={isActive}
			$activeColour={activeColour}
			onClick={() => handleClick()}
		>
			{title && title}
			{(isProject && isActive) && (
				<ArrowSvg color={activeColour} />
			)}
		</PillWrapper>
	);
};

export default Pill;
