import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import CreditsTrigger from '../../elements/CreditsTrigger';
import ProjectsNavigationTrigger from '../../elements/ProjectsNavigationTrigger';
import CloseProjectTrigger from '../../elements/CloseProjectTrigger';
import PlayTrigger from '../../elements/PlayTrigger';
import MuteTrigger from '../../elements/MuteTrigger';
import SeekBar from '../../elements/SeekBar';

type Props = {
	creditsIsActive: boolean;
	isMuted: boolean;
	isPlaying: boolean;
	currentTime: number;
	videoLength: number;
	setCreditsIsActive: (creditsIsActive: boolean) => void;
	setIsExpanded: (isExpanded: boolean) => void;
	setIsMuted: (isMuted: boolean) => void;
	setIsPlaying: (isPlaying: boolean) => void;
	handleSeek: (time: number) => void;
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

const TitleWrapper = styled.div``;

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
				<ProjectsNavigationTrigger />
				<CloseProjectTrigger setIsExpanded={setIsExpanded} />
			</TopBar>
			<TitleWrapper>
				<Title>Project Title</Title>
				<Client>Project Client</Client>
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
