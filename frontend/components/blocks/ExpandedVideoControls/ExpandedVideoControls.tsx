import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreditPanel from '../CreditPanel';
import ControlsPanel from '../ControlsPanel';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductionType } from '../../../shared/types/types';
import throttle from 'lodash.throttle';
import useViewportWidth from '../../../hooks/useViewportWidth';

type Props = {
	isExpanded: boolean;
	isMuted: boolean;
	isPlaying: boolean;
	currentTime: number;
	videoLength: number;
	data: ProductionType;
	hasNextProject: boolean;
	hasPreviousProject: boolean;
	setIsExpanded?: (isExpanded: boolean | undefined) => void | undefined;
	setIsMuted: (isMuted: boolean) => void;
	setIsPlaying: (isPlaying: boolean) => void;
	handleSeek: (time: number) => void;
	handleNextProject?: (() => void | undefined) | undefined;
	handlePreviousProject?: (() => void | undefined) | undefined;
};

const ExpandedVideoControlsWrapper = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	height: 100dvh;
	z-index: 10;
	color: var(--colour-white);
	mix-blend-mode: difference;
`;

const Inner = styled(motion.div)`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
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
			delay: 0.6
		}
	}
};

const innerVariants = {
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
		hasNextProject,
		hasPreviousProject,
		setIsExpanded,
		setIsMuted,
		setIsPlaying,
		handleSeek,
		handleNextProject,
		handlePreviousProject
	} = props;

	const [creditsIsActive, setCreditsIsActive] = useState(false);
	const [isActive, setIsActive] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	const viewportWidth = useViewportWidth();

	useEffect(() => {
		if (viewportWidth === 'tabletPortrait' || viewportWidth === 'mobile') {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [viewportWidth]);

	useEffect(() => {
		if (!isExpanded) {
			setCreditsIsActive(false);
		}
	}, [isExpanded]);

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
		if (!isExpanded) return;

		let timeout: any;

		const body = document.querySelector('body');

		if (!body) return;

		if (!isActive) {
			body.classList.add('hide-cursor');
		} else {
			body.classList.remove('hide-cursor');
		}

		const handleMouseInactive = () => {
			if (!creditsIsActive) {
				timeout = setTimeout(() => {
					setIsActive(false);
				}, isMobile ? 6000 : 2000);
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
	}, [creditsIsActive, isActive, isExpanded]);

	return (
		<AnimatePresence>
			{isExpanded &&
				<ExpandedVideoControlsWrapper
					variants={wrapperVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
					key={1}
				>
					<AnimatePresence>
						{isActive && (
							<Inner
								variants={innerVariants}
								initial='hidden'
								animate='visible'
								exit='hidden'
								key={2}
							>
								<CreditPanel
									creditsIsActive={creditsIsActive}
									data={data}
									isMobile={isMobile}
									setCreditsIsActive={setCreditsIsActive}
								/>
								<ControlsPanel
									creditsIsActive={creditsIsActive}
									isMuted={isMuted}
									isPlaying={isPlaying}
									currentTime={currentTime}
									videoLength={videoLength}
									data={data}
									hasNextProject={hasNextProject}
									hasPreviousProject={hasPreviousProject}
									isMobile={isMobile}
									setCreditsIsActive={setCreditsIsActive}
									setIsExpanded={setIsExpanded}
									setIsMuted={setIsMuted}
									setIsPlaying={setIsPlaying}
									handleSeek={handleSeek}
									handleNextProject={handleNextProject}
									handlePreviousProject={handlePreviousProject}
									setIsActive={setIsActive}
								/>
							</Inner>
						)}
					</AnimatePresence>
				</ExpandedVideoControlsWrapper>
			}
		</AnimatePresence>
	);
};

export default ExpandedVideoControls;
