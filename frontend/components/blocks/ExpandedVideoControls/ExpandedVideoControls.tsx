import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreditPanel from '../CreditPanel';
import ControlsPanel from '../ControlsPanel';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductionType } from '../../../shared/types/types';

type Props = {
	isExpanded: boolean;
	setIsExpanded: (isExpanded: boolean) => void;
	data: ProductionType;
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
		setIsExpanded,
		data
	} = props;

	const [creditsIsActive, setCreditsIsActive] = useState(false);

	useEffect(() => {
		const body = document.querySelector('body');

		if (!body) return;

		if (creditsIsActive) {
			body.classList.add('credits-is-active');
		} else {
			body.classList.remove('credits-is-active');
		}
	}, [creditsIsActive]);

	return (
		<AnimatePresence>
			{isExpanded &&
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
						setCreditsIsActive={setCreditsIsActive}
						setIsExpanded={setIsExpanded}
					/>
				</ExpandedVideoControlsWrapper>
			}
		</AnimatePresence>
	);
};

export default ExpandedVideoControls;
