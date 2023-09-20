import styled from 'styled-components';
import CrossSvg from '../../Svgs/CrossSvg';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	setIsExpanded: (isExpanded: boolean) => void;
};

const CloseProjectTriggerWrapper = styled.button`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	column-gap: ${pxToRem(8)};
	color: var(--colour-white);
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
		setIsExpanded
	} = props;

	return (
		<CloseProjectTriggerWrapper
			onClick={() => setIsExpanded(false)}
		>
			Close Project
			<CrossSvg />
		</CloseProjectTriggerWrapper>
	);
};

export default CloseProjectTrigger;
