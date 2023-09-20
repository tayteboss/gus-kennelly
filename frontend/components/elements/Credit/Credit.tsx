import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

const Link = styled(motion.a)``;

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

const Credit = () => {
	const [title, setTitle] = useState("Credits");

	return (
		<Link
			href="https://tayte.co/"
			target="_blank"
			onMouseOver={() => setTitle('tayte.co')}
			onMouseOut={() => setTitle('Credits')}
			variants={wrapperVariants}
			initial='hidden'
			animate='visible'
			exit='hidden'
		>
			{title}
		</Link>
	);
};

export default Credit;
