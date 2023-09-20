import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { motion } from 'framer-motion';

type Props = {
	isActive: boolean;
};

const AvailableForWorkWrapper = styled(motion.div)`
	display: flex;
	align-items: center;
	column-gap: ${pxToRem(8)};
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

const AvailableForWork = ({ isActive }: Props) => {
	return (
		<AvailableForWorkWrapper
			variants={wrapperVariants}
			initial='hidden'
			animate='visible'
			exit='hidden'
		>
			{isActive ? 'Available for work' : 'Not available'}
		</AvailableForWorkWrapper>
	);
};

export default AvailableForWork;
