import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type StyledProps = {
	$creditsIsActive: boolean;
};

type Props = {
	creditsIsActive: boolean;
	setCreditsIsActive: (creditsIsActive: boolean) => void;
};

const CreditsTriggerWrapper = styled.button`
	color: var(--colour-white);
	display: flex;
	align-items: center;
	column-gap: ${pxToRem(8)};
	width: 136px;
`;

const Icon = styled.div<StyledProps>`
	height: ${pxToRem(7)};
	width: ${pxToRem(7)};
	border: 1px solid var(--colour-white);
	border-radius: 50%;
	background: ${(props) => props.$creditsIsActive ? 'var(--colour-white)' : 'transparent'};

	transition: all var(--transition-speed-slow) var(--transition-ease);
`;

const CreditsTrigger = (props: Props) => {
	const {
		creditsIsActive,
		setCreditsIsActive
	} = props;

	return (
		<CreditsTriggerWrapper
			onClick={() => setCreditsIsActive(!creditsIsActive)}
		>
			{creditsIsActive ? 'Hide Project Details' : 'Show Project Details'}
			<Icon $creditsIsActive={creditsIsActive} />
		</CreditsTriggerWrapper>
	);
};

export default CreditsTrigger;
