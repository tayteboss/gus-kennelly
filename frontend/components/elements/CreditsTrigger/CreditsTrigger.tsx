import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type StyledProps = {
	$creditsIsActive?: boolean;
	$isPhotographyType?: boolean;
};

type Props = {
	creditsIsActive: boolean;
	setCreditsIsActive: (creditsIsActive: boolean) => void;
	isPhotographyType?: boolean;
};

const CreditsTriggerWrapper = styled.button<StyledProps>`
	color: ${(props) => props.$isPhotographyType ? 'var(--colour-black)' : 'var(--colour-white)'};
	display: flex;
	align-items: center;
	column-gap: ${pxToRem(8)};
	width: 136px;
	flex: 1;

	&:hover {
		.credits-trigger__icon {
			background: ${(props) => props.$isPhotographyType ? 'var(--colour-black)' : 'var(--colour-white)'};
		}
	}
`;

const Icon = styled.div<StyledProps>`
	height: ${pxToRem(7)};
	width: ${pxToRem(7)};
	border: 1px solid ${(props) => props.$isPhotographyType ? 'var(--colour-black)' : 'var(--colour-white)'};
	border-radius: 50%;
	background: ${(props) => props.$creditsIsActive ?  props.$isPhotographyType ? 'var(--colour-black)' : 'var(--colour-white)' : 'transparent'};

	transition: all var(--transition-speed-slow) var(--transition-ease);
`;

const CreditsTrigger = (props: Props) => {
	const {
		creditsIsActive,
		setCreditsIsActive,
		isPhotographyType
	} = props;

	return (
		<CreditsTriggerWrapper
			onClick={() => setCreditsIsActive(!creditsIsActive)}
			$isPhotographyType={isPhotographyType}
		>
			{creditsIsActive ? 'Hide Project Details' : 'Show Project Details'}
			<Icon
				className="credits-trigger__icon"
				$creditsIsActive={creditsIsActive}
				$isPhotographyType={isPhotographyType}
			/>
		</CreditsTriggerWrapper>
	);
};

export default CreditsTrigger;
