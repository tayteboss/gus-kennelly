import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	children: any;
	title?: string;
};

const InformationElementWrapper = styled.div``;

const Title = styled.h3`
	margin-bottom: ${pxToRem(8)};
`;

const ChildrenWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const InformationElement = (props: Props) => {
	const {
		children,
		title
	} = props;

	return (
		<InformationElementWrapper className="information-element">
			{title && (
				<Title>{title}</Title>
			)}
			<ChildrenWrapper>
				{children}
			</ChildrenWrapper>
		</InformationElementWrapper>
	);
};

export default InformationElement;
