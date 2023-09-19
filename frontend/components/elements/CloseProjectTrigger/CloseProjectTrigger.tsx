import styled from 'styled-components';
import CrossSvg from '../../Svgs/CrossSvg';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	setIsExpanded: (isExpanded: boolean) => void;
};

const CloseProjectTriggerWrapper = styled.button`
	display: flex;
	align-items: center;
	column-gap: ${pxToRem(8)};
	color: var(--colour-white);
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
