import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	children: React.ReactNode;
	title: string;
};

const CreditElementWrapper = styled.div`
	margin-bottom: ${pxToRem(8)};

	* {
		color: var(--colour-white);
	}
`;

const Title = styled.h3``;

const Children = styled.div`
	opacity: 0.75;
`;

const CreditElement = (props: Props) => {
	const {
		children,
		title
	} = props;

	return (
		<CreditElementWrapper>
			<Title>{title}</Title>
			<Children>
				{children}
			</Children>
		</CreditElementWrapper>
	);
};

export default CreditElement;
