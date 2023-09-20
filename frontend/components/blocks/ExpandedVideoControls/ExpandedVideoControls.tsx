import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreditPanel from '../CreditPanel';
import ControlsPanel from '../ControlsPanel';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductionType } from '../../../shared/types/types';
import throttle from 'lodash.throttle';

type Props = {
	isExpanded: boolean;
	isMuted: boolean;
	isPlaying: boolean;
	currentTime: number;
	videoLength: number;
	data: ProductionType;
	setIsExpanded: (isExpanded: boolean) => void;
	setIsMuted: (isMuted: boolean) => void;
	setIsPlaying: (isPlaying: boolean) => void;
	handleSeek: (time: number) => void;
};

const ExpandedVideoControlsWrapper = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	display: flex;
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

const ExpandedVideoControls = (props: Props) => {
	const {
		isExpanded,
		isMuted,
		isPlaying,
		currentTime,
		videoLength,
		data,
		setIsExpanded,
		setIsMuted,
		setIsPlaying,
		handleSeek
	} = props;

	const [creditsIsActive, setCreditsIsActive] = useState(false);
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		const body = document.querySelector('body');

		if (!body) return;

		if (creditsIsActive) {
			body.classList.add('credits-is-active');
		} else {
			body.classList.remove('credits-is-active');
		}
	}, [creditsIsActive]);

	useEffect(() => {
		let timeout: any;

		const handleMouseInactive = () => {
			if (!creditsIsActive) {
				timeout = setTimeout(() => {
					setIsActive(false);
				}, 3000);
			} else {
				clearTimeout(timeout);
				setIsActive(true);
			}
		};

		// Call handleMouseInactive initially
		handleMouseInactive();
	
		const handleMouseActive = () => {
			clearTimeout(timeout);
			setIsActive(true);

			// Restart the timer when the mouse becomes active again
			if (creditsIsActive) {
				clearTimeout(timeout);
				setIsActive(true);
			} else {
				handleMouseInactive();
			}
		};

		const throttledHandleMouseMove = throttle(handleMouseActive, 200);
		window.addEventListener('mousemove', throttledHandleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseActive);
			clearTimeout(timeout);
		};
	}, [creditsIsActive, isActive]);

	return (
		<AnimatePresence>
			{(isExpanded && isActive) &&
				<ExpandedVideoControlsWrapper
					variants={wrapperVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
				>
					<CreditPanel
						creditsIsActive={creditsIsActive}
						data={data}
					/>
					<ControlsPanel
						creditsIsActive={creditsIsActive}
						isMuted={isMuted}
						isPlaying={isPlaying}
						currentTime={currentTime}
						videoLength={videoLength}
						data={data}
						setCreditsIsActive={setCreditsIsActive}
						setIsExpanded={setIsExpanded}
						setIsMuted={setIsMuted}
						setIsPlaying={setIsPlaying}
						handleSeek={handleSeek}
					/>
				</ExpandedVideoControlsWrapper>
			}
		</AnimatePresence>
	);
};

export default ExpandedVideoControls;
