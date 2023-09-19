import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import CreditElement from '../../elements/CreditElement';
import { ProductionType } from '../../../shared/types/types';

type StyledProps = {
	$creditsIsActive: boolean;
};

type Props = {
	creditsIsActive: boolean;
	data: ProductionType;
}

const CreditPanelWrapper = styled(motion.div)<StyledProps>`
	background: rgba(0, 0, 0, 0.9);
	backdrop-filter: blur(5px);
	overflow: auto;
	height: 100vh;

	transition: all var(--transition-speed-slow) var(--transition-ease);

	* {
		color: var(--colour-white);
	}
`;

const Inner = styled(motion.div)`
	overflow: hidden;
	padding-bottom: ${pxToRem(36)};
`;

const PaddingWrapper = styled.div`
	padding-top: ${pxToRem(16)};
	padding-left: ${pxToRem(16)};
`;

const CreditElementChildren = styled.p``;

const wrapperVariants = {
	hidden: {
		width: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			when: 'afterChildren'
		}
	},
	visible: {
		width: 360,
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
			when: 'beforeChildren'
		}
	}
};

const childVariants = {
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
			duration: 0.5,
			ease: 'easeInOut',
			delay: 0.15
		}
	}
};

const CreditPanel = (props: Props) => {
	const {
		creditsIsActive,
		data
	} = props;

	return (
		<CreditPanelWrapper
			$creditsIsActive={creditsIsActive}
			variants={wrapperVariants}
			initial='hidden'
			animate={creditsIsActive ? 'visible' : 'hidden'}
		>
			<Inner
				variants={childVariants}
			>
				<PaddingWrapper>
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
					{data?.description && (
						<CreditElement title="Description">
							<PortableText value={data.description} />
						</CreditElement>
					)}
					{data?.credits && (
						<CreditElement title="Credits">
							<PortableText value={data.credits} />
						</CreditElement>
					)}
					{data?.awards && (
						<CreditElement title="Awards">
							<PortableText value={data.awards} />
						</CreditElement>
					)}
				</PaddingWrapper>
			</Inner>
		</CreditPanelWrapper>
	);
};

export default CreditPanel;
