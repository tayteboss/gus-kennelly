import styled from 'styled-components';
import CreditElement from '../../elements/CreditElement';
import { PhotographyType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { AnimatePresence, motion } from 'framer-motion';

type StyledProps = {
	$bgColour: string;
};

type Props = {
	data: PhotographyType;
	creditsIsActive: boolean;
	bgColour: string;
};

const PhotographyCreditsPanelWrapper = styled(motion.div)<StyledProps>`
	position: absolute;
	top: 100%;
	left: 0;
	padding: ${pxToRem(16)} ${pxToRem(240)} ${pxToRem(16)} ${pxToRem(16)};
	height: 100vh;
	height: 100dvh;
	background: ${(props) => props.$bgColour};
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
		x: '-100%',
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
			when: 'afterChildren'
		}
	},
	visible: {
		x: 0,
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
			staggerChildren: 0.1,
			when: 'beforeChildren'
		}
	}
};

const PhotographyCreditsPanel = (props: Props) => {
	const {
		data,
		creditsIsActive,
		bgColour
	} = props;

	return (
		<AnimatePresence>
			{creditsIsActive && (
				<PhotographyCreditsPanelWrapper
					variants={wrapperVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
					$bgColour={bgColour}
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
