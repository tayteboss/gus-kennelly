import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import ArrowSvg from '../../Svgs/ArrowSvg';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	isActive: boolean;
	setIsExpanded?: (isExpanded: boolean | undefined) => void | undefined;
	isProduction: boolean;
};

const ExpandTriggerWrapper = styled(motion.button)`
	position: absolute;
	top: ${pxToRem(8)};
	right: ${pxToRem(10)};
	z-index: 10;
	color: var(--colour-white);
	display: flex;
	align-items: center;
	column-gap: ${pxToRem(6)};
	color: var(--colour-white);
	mix-blend-mode: difference;
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

const ExpandTrigger = (props: Props) => {
	const {
		isActive,
		setIsExpanded,
		isProduction
	} = props;

	return (
		<AnimatePresence>
			{isActive && (
				<ExpandTriggerWrapper
					variants={wrapperVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
					onClick={() => {
						if (setIsExpanded) {
							setIsExpanded(true)
						}
					}}
				>
					{isProduction ? 'Expand' : 'View Project'}
					<ArrowSvg />
				</ExpandTriggerWrapper>
			)}
		</AnimatePresence>
	);
};

export default ExpandTrigger;
