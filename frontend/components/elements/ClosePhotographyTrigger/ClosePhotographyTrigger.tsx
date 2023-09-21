import styled from 'styled-components';
import CrossSvg from '../../Svgs/CrossSvg';
import pxToRem from '../../../utils/pxToRem';

type StyledProps = {
	$isPhotographyType?: boolean;
}

type Props = {
	isPhotographyType?: boolean;
	handleCloseProject: () => void;
};

const ClosePhotographyTriggerWrapper = styled.button<StyledProps>`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	column-gap: ${pxToRem(8)};
	color: ${(props) => props.$isPhotographyType ? 'var(--colour-black)' : 'var(--colour-white)'};
	flex: 1;

	&:hover {
		.cross-svg {
			transform: rotate(90deg);
		}
	}

	.cross-svg {
		transition: all var(--transition-speed-default) var(--transition-ease);
	}
`;

const CloseProjectTrigger = (props: Props) => {
	const {
		isPhotographyType,
		handleCloseProject
	} = props;

	return (
		<ClosePhotographyTriggerWrapper
			onClick={() => handleCloseProject()}
			$isPhotographyType={isPhotographyType}
		>
			Close Project
			<CrossSvg color={isPhotographyType ? '#000000' : '#FFFFFF'} />
		</ClosePhotographyTriggerWrapper>
	);
};

export default CloseProjectTrigger;
