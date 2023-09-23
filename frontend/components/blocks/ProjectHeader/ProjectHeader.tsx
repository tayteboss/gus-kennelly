import styled from 'styled-components';
import ProjectsNavigationTrigger from '../../elements/ProjectsNavigationTrigger';
import CreditsTrigger from '../../elements/CreditsTrigger';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import CloseProjectTrigger from '../../elements/CloseProjectTrigger';
import { useEffect, useRef, useState } from 'react';
import PhotographyCreditsPanel from '../PhotographyCreditsPanel';
import { PhotographyType } from '../../../shared/types/types';
import throttle from 'lodash.throttle';

type StyledProps = {
	$bgColour: string;
	$isActive: boolean;
}

type Props = {
	hasNextProject: boolean;
	hasPreviousProject: boolean;
	data: PhotographyType;
	bgColour: string;
	isMobile: boolean;
	handleNextProject: () => void;
	handlePreviousProject: () => void;
}

const ProjectHeaderWrapper = styled.div<StyledProps>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: ${(props: any) => props.$bgColour};
	z-index: 10;
	transform: translateY(${(props: any) => props.$isActive ? '0' : '-100%'});

	transition: all var(--transition-speed-slow) var(--transition-ease);
`;

const Inner = styled.div`
	display: flex;
	justify-content: space-between;
	padding: ${pxToRem(16)} 0;
`;

const ProjectHeader = (props: Props) => {
	const {
		hasNextProject,
		hasPreviousProject,
		data,
		bgColour,
		isMobile,
		handleNextProject,
		handlePreviousProject,
	} = props;

	const [creditsIsActive, setCreditsIsActive] = useState(false);
	const [isActive, setIsActive] = useState(true);

	const prevScrollPosRef = useRef(0);

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;

		const isScrollingDown = currentScrollPos > prevScrollPosRef.current && currentScrollPos > 250;

		setIsActive(!isScrollingDown);
		prevScrollPosRef.current = currentScrollPos;
	};

	useEffect(() => {
		const throttledHandleScroll = throttle(handleScroll, 50);
		window.addEventListener('scroll', throttledHandleScroll);

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll);
		};
	}, []);

	return (
		<ProjectHeaderWrapper
			$bgColour={bgColour}
			$isActive={isActive}
		>
			<LayoutWrapper>
				<Inner>
					<CreditsTrigger
						creditsIsActive={creditsIsActive}
						setCreditsIsActive={setCreditsIsActive}
						isPhotographyType
						isMobile={isMobile}
					/>
					<ProjectsNavigationTrigger
						handleNextProject={handleNextProject}
						handlePreviousProject={handlePreviousProject}
						hasNextProject={hasNextProject}
						hasPreviousProject={hasPreviousProject}
						isPhotographyType
						isMobile={isMobile}
					/>
					<CloseProjectTrigger
						isPhotographyType
						setCreditsIsActive={setCreditsIsActive}
						creditsIsActive={creditsIsActive}
						isMobile={isMobile}
					/>
				</Inner>
			</LayoutWrapper>
			<PhotographyCreditsPanel
				data={data}
				creditsIsActive={creditsIsActive}
				bgColour={bgColour}
				isMobile={isMobile}
				setCreditsIsActive={setCreditsIsActive}
			/>
		</ProjectHeaderWrapper>
	);
};

export default ProjectHeader;
