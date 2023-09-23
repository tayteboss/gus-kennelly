import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import ArrowSvg from '../../Svgs/ArrowSvg';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

type Props = {
	isActive: boolean;
	setIsExpanded?: (isExpanded: boolean | undefined) => void | undefined;
	isProduction: boolean;
	snippetData: any;
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
		isProduction,
		snippetData
	} = props;

	const router = useRouter();

	const handlePhotographyPush = () => {
		router.push(`/photography/${snippetData?.slug?.current}`);
	};

	return (
		<AnimatePresence>
			{isActive && (
				<ExpandTriggerWrapper
					variants={wrapperVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
					onClick={() => {
						isProduction ? setIsExpanded && setIsExpanded(true) : handlePhotographyPush();
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
