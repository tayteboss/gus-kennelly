import styled from 'styled-components';
import CreditElement from '../../elements/CreditElement';
import { PhotographyType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	data: PhotographyType;
	creditsIsActive: boolean;
};

const PhotographyCreditsPanelWrapper = styled(motion.div)`
	position: absolute;
	top: 100%;
	left: 0;
	padding: ${pxToRem(16)};
	height: 100vh;
	height: 100dvh;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(5px);

	* {
		color: var(--colour-black);
	}
`;

const CreditElementChildren = styled.p`
	color: var(--colour-black);
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

const PhotographyCreditsPanel = (props: Props) => {
	const {
		data,
		creditsIsActive
	} = props;

	return (
		<AnimatePresence>
			{creditsIsActive && (
				<PhotographyCreditsPanelWrapper
					variants={wrapperVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
				>
					{data?.title && (
						<CreditElement title="Title">
							<CreditElementChildren>
								{data.title}
							</CreditElementChildren>
						</CreditElement>
					)}
					{data?.client && (
						<CreditElement title="Client">
							<CreditElementChildren>
								{data.client}
							</CreditElementChildren>
						</CreditElement>
					)}
					{data?.year && (
						<CreditElement title="Year">
							<CreditElementChildren>
								{data.year}
							</CreditElementChildren>
						</CreditElement>
					)}
					{data?.category && (
						<CreditElement title="Category">
							<CreditElementChildren>
								{data.category}
							</CreditElementChildren>
						</CreditElement>
					)}
				</PhotographyCreditsPanelWrapper>
			)}
		</AnimatePresence>
	);
};

export default PhotographyCreditsPanel;
