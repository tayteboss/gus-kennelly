import styled from 'styled-components';
import CrossSvg from '../../Svgs/CrossSvg';
import pxToRem from '../../../utils/pxToRem';
import { useRouter } from 'next/router';

type StyledProps = {
	$isPhotographyType?: boolean;
}

type Props = {
	isPhotographyType?: boolean;
	isMobile?: boolean;
	setIsExpanded?: (isExpanded: boolean) => void;
};

const CloseTriggerWrapper = styled.button<StyledProps>`
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
		isMobile,
		setIsExpanded
	} = props;

	const router = useRouter();

	const handleClick = () => {
		if (isPhotographyType) {
			router.push('/');
		}

		if (setIsExpanded) {
			setIsExpanded(false);
		}
	}

	return (
		<CloseTriggerWrapper
			onClick={() => handleClick()}
			$isPhotographyType={isPhotographyType}
		>
			{isMobile ? 'Close' : 'Close Project'}
			<CrossSvg color={isPhotographyType ? '#000000' : '#FFFFFF'} />
		</CloseTriggerWrapper>
	);
};

export default CloseProjectTrigger;
