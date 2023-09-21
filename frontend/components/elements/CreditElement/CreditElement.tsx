import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { motion } from 'framer-motion';

type Props = {
	children: React.ReactNode;
	title: string;
};

const CreditElementWrapper = styled(motion.div)`
	margin-bottom: ${pxToRem(8)};

	* {
		color: var(--colour-white);
	}
`;

const Title = styled.h3``;

const Children = styled.div`
	opacity: 0.75;
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
			ease: 'easeInOut'
		}
	}
};

const CreditElement = (props: Props) => {
	const {
		children,
		title
	} = props;

	return (
		<CreditElementWrapper
			variants={wrapperVariants}
		>
			<Title>{title}</Title>
			<Children>
				{children}
			</Children>
		</CreditElementWrapper>
	);
};

export default CreditElement;
