import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	isMobile: boolean;
}

const Link = styled(motion.a)`
	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		margin-top: ${pxToRem(16)};
		display: inline-block;
	}
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
			delay: 0.5
		}
	}
};

const Credit = (props: Props) => {
	const {
		isMobile
	} = props;

	const [title, setTitle] = useState("Credits");

	return (
		<Link
			href="https://tayte.co/"
			target="_blank"
			onMouseOver={() => setTitle(isMobile ? 'Built by tayte.co' : 'tayte.co')}
			onMouseOut={() => setTitle('Credits')}
			variants={wrapperVariants}
			initial='hidden'
			animate='visible'
			exit='hidden'
		>
			{isMobile ? 'Built by tayte.co' : title}
		</Link>
	);
};

export default Credit;
