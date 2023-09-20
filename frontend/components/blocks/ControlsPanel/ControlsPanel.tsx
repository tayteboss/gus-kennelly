import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import CreditsTrigger from '../../elements/CreditsTrigger';
import ProjectsNavigationTrigger from '../../elements/ProjectsNavigationTrigger';
import CloseProjectTrigger from '../../elements/CloseProjectTrigger';
import PlayTrigger from '../../elements/PlayTrigger';
import MuteTrigger from '../../elements/MuteTrigger';
import SeekBar from '../../elements/SeekBar';
import { ProductionType } from '../../../shared/types/types';

type Props = {
	creditsIsActive: boolean;
	isMuted: boolean;
	isPlaying: boolean;
	currentTime: number;
	videoLength: number;
	data: ProductionType;
	hasNextProject: boolean;
	hasPreviousProject: boolean;
	setCreditsIsActive: (creditsIsActive: boolean) => void;
	setIsExpanded: (isExpanded: boolean) => void;
	setIsMuted: (isMuted: boolean) => void;
	setIsPlaying: (isPlaying: boolean) => void;
	handleSeek: (time: number) => void;
	handleNextProject: () => void;
	handlePreviousProject: () => void;
};

const ControlsPanelWrapper = styled.div`
	width: 100%;
	height: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: ${pxToRem(16)};
`;

const TopBar = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TitleWrapper = styled.div`
	opacity: ${(props: { $isActive: boolean }) => props.$isActive ? 1 : 0};

	transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Title = styled.h1`
	color: var(--colour-white);
`;

const Client = styled.h2`
	color: var(--colour-white);
`;

const BottomBar = styled.div`
	display: flex;
	align-items: center;
`;

const ControlsPanel = (props: Props) => {
	const {
		creditsIsActive,
		isMuted,
		isPlaying,
		currentTime,
		videoLength,
		data,
		hasNextProject,
		hasPreviousProject,
		handleNextProject,
		handlePreviousProject,
		setCreditsIsActive,
		setIsExpanded,
		setIsMuted,
		setIsPlaying,
		handleSeek
	} = props;

	return (
		<ControlsPanelWrapper>
			<TopBar>
				<CreditsTrigger
					creditsIsActive={creditsIsActive}
					setCreditsIsActive={setCreditsIsActive}
				/>
				<ProjectsNavigationTrigger
					handleNextProject={handleNextProject}
					handlePreviousProject={handlePreviousProject}
					hasNextProject={hasNextProject}
					hasPreviousProject={hasPreviousProject}
				/>
				<CloseProjectTrigger setIsExpanded={setIsExpanded} />
			</TopBar>
			<TitleWrapper $isActive={!creditsIsActive}>
				{data?.title && (
					<Title>{data.title}</Title>
				)}
				{data?.client && (
					<Client>{data.client}</Client>
				)}
			</TitleWrapper>
			<BottomBar>
				<PlayTrigger
					setIsPlaying={setIsPlaying}
					isPlaying={isPlaying}
				/>
				<MuteTrigger
					setIsMuted={setIsMuted}
					isMuted={isMuted}
				/>
				<SeekBar
					videoLength={videoLength}
					currentTime={currentTime}
					handleSeek={handleSeek}
				/>
			</BottomBar>
		</ControlsPanelWrapper>
	);
};

export default ControlsPanel;
