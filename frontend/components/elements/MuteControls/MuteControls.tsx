import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	isMuted: boolean;
	setIsMuted: (isMuted: boolean) => void;
	isActive: boolean;
};

const MuteControlsWrapper = styled(motion.button)`
	position: absolute;
	bottom: ${pxToRem(8)};
	left: ${pxToRem(10)};
	z-index: 10;
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

const MuteControls = (props: Props) => {
	const {
		isMuted,
		setIsMuted,
		isActive
	} = props;

	return (
		<AnimatePresence>
			{isActive && (
				<MuteControlsWrapper
					variants={wrapperVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
					onClick={() => setIsMuted(!isMuted)}
				>
					{isMuted ? 'Unmute' : 'Mute'}
				</MuteControlsWrapper>
			)}
		</AnimatePresence>
	);
};

export default MuteControls;
