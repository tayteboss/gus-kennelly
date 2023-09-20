import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { PhotographyType, ProductionType } from '../../../shared/types/types';
import ArrowSvg from '../../Svgs/ArrowSvg';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type StyledProps = {
	$isActive: boolean;
	$activeColour: string;
};

type Props = {
	title: string;
	isActive: boolean;
	activeColour: string;
	isProjectType?: boolean;
	isCategory?: boolean;
	isProject?: boolean;
	projectData?: any;
	isProduction?: boolean;
	slug?: string;
	columnId?: number;
	handleChangeProjectType?: (isProduction: boolean) => void;
	handleChangeCategory?: (category: string) => void;
	handleChangeProject?: (project: string) => void;
	handleChangeProjectSnippet?: (project: ProductionType | PhotographyType) => void;
	setIsExpanded?: (isExpanded: boolean) => void;
};

const OuterWrapper = styled.div`
	padding-bottom: ${pxToRem(4)};
	width: 100%;
`;

const PillWrapper = styled.button`
	width: 100%;
	padding: 0 ${pxToRem(8)};
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;

	transition: all var(--transition-speed-slow) var(--transition-ease);

	.arrow-svg {
		position: relative;
		z-index: 5;
	}
`;

const Title = styled.div<StyledProps>`
	position: relative;
	z-index: 5;
	text-align: left;
	color: ${(props) => props.$isActive ? props.$activeColour : 'var(--colour-black)'};

	transition: all var(--transition-speed-slow) var(--transition-ease);
`;

const CursorPill = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--colour-black);
	border-radius: 100px;
	z-index: 1;
`;

const HoverPill = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: 1px solid var(--colour-black);
	border-radius: 100px;
	z-index: 1;
`;

const hoverVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.05,
			ease: 'linear'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.05,
			ease: 'linear'
		}
	}
};

const Pill = (props: Props) => {
	const {
		title,
		isActive,
		activeColour,
		isProjectType,
		isCategory,
		isProject,
		projectData,
		isProduction,
		slug,
		columnId,
		handleChangeProjectType,
		handleChangeCategory,
		handleChangeProject,
		handleChangeProjectSnippet,
		setIsExpanded
	} = props;

	const [isHovered, setIsHovered] = useState(false);

	const router = useRouter();

	const handleClick = () => {
		if (isProjectType && handleChangeProjectType) {
			handleChangeProjectType(title === 'Production');
		}

		if (isCategory && handleChangeCategory) {
			handleChangeCategory(title);
		}

		if (isProject && handleChangeProject && handleChangeProjectSnippet) {
			if (isProduction) {
				if (isActive && setIsExpanded) {
					setIsExpanded(true);
				} else {
					handleChangeProject(title);
					handleChangeProjectSnippet(projectData)
				}
			} else {
				if (isActive) {
					router.push(`/photography/${slug}`);
				} else {
					handleChangeProject(title);
					handleChangeProjectSnippet(projectData)
				}
			}
		}
	};

	return (
		<OuterWrapper
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
		>
			<PillWrapper onClick={() => handleClick()}>
				<Title
					$isActive={isActive}
					$activeColour={activeColour}
				>
					{title && title}
				</Title>
				{(isProject && isActive) && (
					<ArrowSvg color={activeColour} />
				)}
				{isActive && (
					<CursorPill
						layoutId={`cursor-pill-${columnId}`}
					/>
				)}
				<AnimatePresence>
					{isHovered && (
						<HoverPill
							layoutId={`hover-pill-${columnId}`}
							variants={hoverVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
						/>
					)}
				</AnimatePresence>
			</PillWrapper>
		</OuterWrapper>
	);
};

export default Pill;
