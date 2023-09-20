import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { motion } from 'framer-motion';

type Props = {
	children: any;
	title?: string;
};

const InformationElementWrapper = styled(motion.div)``;

const Title = styled.h3`
	margin-bottom: ${pxToRem(8)};
`;

const ChildrenWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay: 0.5
		}
	}
};

const InformationElement = (props: Props) => {
	const {
		children,
		title
	} = props;

	return (
		<InformationElementWrapper
			className="information-element"
			variants={wrapperVariants}
			initial='hidden'
			animate='visible'
			exit='hidden'
		>
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
