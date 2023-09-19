import { AnimatePresence, motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	isLoading: boolean;
};

const blink = keyframes`
	50% { background: transparent }
`;

const LoadingWrapper = styled(motion.div)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	column-gap: ${pxToRem(3)};
	z-index: 10;

	.dot:nth-child(2) { animation-delay: 250ms }
	.dot:nth-child(3) { animation-delay: 500ms }
`;

const Dot = styled.div`
	height: 4px;
	width: 4px;
	background: var(--colour-white);
	animation-name: ${blink};
	animation-duration: 1s;
	animation-iteration-count: infinite;
	border-radius: 50%;
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

const Loading = ({ isLoading }: Props) => {
	return (
		<>
			<AnimatePresence>
				{isLoading && (
					<LoadingWrapper
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						<Dot className="dot" />
						<Dot className="dot" />
						<Dot className="dot" />
					</LoadingWrapper>
				)}
			</AnimatePresence>
		</>
	);
};

export default Loading;
