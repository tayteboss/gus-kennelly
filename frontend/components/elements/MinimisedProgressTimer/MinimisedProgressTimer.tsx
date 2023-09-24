import { useEffect, useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	currentTime: number;
	videoLength: number;
	isActive: boolean;
};

const MinimisedProgressTimerWrapper = styled(motion.div)`
	position: absolute;
	bottom: ${pxToRem(8)};
	right: ${pxToRem(10)};
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	column-gap: ${pxToRem(4)};
	min-width: 90px;
`;

const Current = styled.div`
	color: var(--colour-white);
`;

const Divider = styled.div`
	color: var(--colour-white);
`;

const VideoLength = styled.div`
	color: var(--colour-white);
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

const MinimisedProgressTimer = (props: Props) => {
	const {
		currentTime,
		videoLength,
		isActive
	} = props;

	const [currentTimeFormatted, setCurrentTimeFormated] = useState('00:00');
	const [videoLengthFormatted, setVideoLengthFormated] = useState('00:00');

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60).toString().padStart(2, '0');
		const seconds = Math.floor(time % 60).toString().padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	useEffect(() => {
		if (!videoLength) return;

		const currentTimeFormatted = formatTime(Math.floor(currentTime));
		const videoLengthFormatted = formatTime(Math.floor(videoLength));
		setCurrentTimeFormated(currentTimeFormatted);
		setVideoLengthFormated(videoLengthFormatted);
	}, [currentTime, videoLength]);

	return (
		<AnimatePresence>
			{isActive && (
				<MinimisedProgressTimerWrapper
					variants={wrapperVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
				>
					<Current>{currentTimeFormatted}</Current>
					<Divider> / </Divider>
					<VideoLength>{videoLengthFormatted}</VideoLength>
				</MinimisedProgressTimerWrapper>
			)}
		</AnimatePresence>
	);
};

export default MinimisedProgressTimer;
