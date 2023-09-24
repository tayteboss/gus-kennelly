import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import MuxPlayer from '@mux/mux-player-react';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../elements/Loading';
import ExpandTrigger from '../../elements/ExpandTrigger';
import MuteControls from '../../elements/MuteControls';
import ExpandedVideoControls from '../ExpandedVideoControls';
import MinimisedProgressTimer from '../../elements/MinimisedProgressTimer';
import Image from 'next/image';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { PhotographyType, ProductionType } from '../../../shared/types/types';

type StyledProps = {
	$isLoading?: boolean;
	$isExpanded?: boolean;
	$ratioHeight?: number;
	$hasVisited?: boolean;
	$isPhotographyFooter?: boolean;
};

type Props = {
	snippetData: any;
	isExpanded?: boolean;
	hasVisited: boolean;
	hasNextProject?: boolean;
	hasPreviousProject?: boolean;
	isPhotographyFooter?: boolean;
	setIsExpanded?: (isExpanded: boolean | undefined) => void | undefined;
	handleNextProject?: (() => void | undefined) | undefined;
	handlePreviousProject?: (() => void | undefined) | undefined;
};

const ProjectSnippetWrapper = styled.div<StyledProps>`
	position: absolute;
	top: 16px;
	right: 16px;
	transform: ${(props) => props.$isExpanded ? 'translate(16px, -16px)' : 'translate(0, 0)'};
	z-index: 100;
	opacity: ${(props) => props.$hasVisited ? 1 : 0};

	transition: all var(--transition-speed-extra-slow) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		top: unset;
		right: ${(props) => props.$isExpanded ? '0' : '16px)'};
		bottom: ${(props) => props.$isExpanded ? '0' : 'calc(var(--information-height) + 16px)'};
		transform: ${(props) => props.$isExpanded ? 'translate(0, 0)' : 'translate(0, 0)'};
		display: ${(props) => props.$isPhotographyFooter ? 'none' : 'block'};
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		right: ${(props) => props.$isExpanded ? '0' : '8px'};
		z-index: 10;
	}
`;

const Inner = styled.div<StyledProps>`
	height: ${(props) => props.$isExpanded ? '100vh' : `${props.$ratioHeight}px`};
	height: ${(props) => props.$isExpanded ? '100dvh' : `${props.$ratioHeight}px`};
	width: ${(props) => props.$isExpanded ? '100vw' : '41.6666666667vw'};
	position: relative;
	border-radius: ${(props) => props.$isExpanded ? 0 : pxToRem(6)};
	overflow: hidden;

	transition: all var(--transition-speed-extra-slow) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		height: ${(props) => props.$isExpanded ? '100vh' : `${props.$ratioHeight}px`};
		height: ${(props) => props.$isExpanded ? '100dvh' : `${props.$ratioHeight}px`};
		width: ${(props) => props.$isExpanded ? '100vw' : 'calc(66.66vw - 32px)'};
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		height: ${(props) => props.$isExpanded ? '100vh' : `${props.$ratioHeight}px`};
		height: ${(props) => props.$isExpanded ? '100dvh' : `${props.$ratioHeight}px`};
		width: ${(props) => props.$isExpanded ? '100vw' : 'calc(100vw - 16px)'};
	}
`;

const SnippetWrapper = styled.div<StyledProps>`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	filter: ${(props) => props.$isLoading ? 'brightness(0.3) blur(1px)' : 'brightness(1) blur(0px)'};
	transform: ${(props) => props.$isLoading ? 'scale(1.01)' : 'scale(1)'};

	transition: filter 500ms var(--transition-ease), transform 2000ms var(--transition-ease);

	mux-player {
		--media-object-fit: contain;
		--media-object-position: center;
		--controls: none;

		height: 100%;
		width: 100%;

		transition: all var(--transition-speed-slow) var(--transition-ease);
	}
`;

const PlayTrigger = styled.button`
	position: absolute;
	top: 8px;
	left: 16px;
	color: var(--colour-white);
	z-index: 10;
`;

const ProjectSnippet = (props: Props) => {
	const {
		snippetData,
		isExpanded = false,
		hasVisited,
		hasNextProject = false,
		hasPreviousProject = false,
		isPhotographyFooter = false,
		setIsExpanded,
		handleNextProject,
		handlePreviousProject
	} = props;

	const [isLoading, setIsLoading] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [isPlaying, setIsPlaying] = useState(true);
	const [ratioHeight, setRatioHeight] = useState(350);
	const [currentTime, setCurrentTime] = useState(0);
	const [videoLength, setVideoLength] = useState(snippetData?.media?.asset?.data?.duration);
	const [muxKey, setMuxKey] = useState(0);
	const [data, setData] = useState<string | undefined>(undefined);
	const [type, setType] = useState('production');

	const muxPlayerRef = useRef<any>(null);
	const snippetWrapperRef = useRef<HTMLDivElement>(null);

	const windowDimensions = useWindowDimensions();

	const handleSeek = (time: number) => {
		if (muxPlayerRef?.current) {
			muxPlayerRef.current.currentTime = time;
		}
	};

	useEffect(() => {
		if (windowDimensions.width < 768) {
			setIsHovered(true);
		} else {
			setIsHovered(false);
		}
	}, [windowDimensions.width]);

	useEffect(() => {
		const type = snippetData?._type ? snippetData?._type : 'photography';
		setType(type);

		let data;

		if (type === 'production') {
			data = snippetData?.media?.asset?.playbackId;
		} else {
			data = snippetData?.featuredImage;
		}

		setData(data);
	}, [snippetData]);

	useEffect(() => {
		const body = document.querySelector('body');

		if (!body) return;

		if (isExpanded) {
			body.classList.add('project-is-expanded');
		} else {
			body.classList.remove('project-is-expanded');
		}
	}, [isExpanded]);

	useEffect(() => {
		// pause the video when isPlaying is false
		if (muxPlayerRef.current) {
			if (isPlaying) {
				muxPlayerRef.current.play();
			} else {
				muxPlayerRef.current.pause();
			}
		}
	}, [isPlaying]);

	useEffect(() => {
		setVideoLength(snippetData?.media?.asset?.data?.duration);

		// Get the current time of the video
		const interval = setInterval(() => {
			if (muxPlayerRef.current) {
				let currentTime = muxPlayerRef.current?.currentTime;

				setCurrentTime(currentTime);
			}
		}, 250);

		return () => clearInterval(interval);
	}, [snippetData]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setMuxKey(muxKey + 1);
		}, 500);

		return () => clearTimeout(timer);
	}, [hasVisited]);

	useEffect(() => {
		muxPlayerRef?.current?.play();

		// Create 16:9 ratio for video player
		const timer2 = setTimeout(() => {
			const snippetWrapperWidth = snippetWrapperRef?.current?.offsetWidth;
			const windowWidth = window.innerWidth;
	
			if (!snippetWrapperWidth) return;
	
			const snippetWrapperWidthPercentage = (snippetWrapperWidth / windowWidth) * 100;
	
			const ratioHeight = (window.innerWidth / 100) * snippetWrapperWidthPercentage * (9 / 16);
			document.documentElement.style.setProperty('--ratio-height', `${ratioHeight}px`);
			
			setRatioHeight(ratioHeight);
			muxPlayerRef?.current?.play();
		}, 100);

		window.addEventListener('resize', () => {
			const snippetWrapperWidth = snippetWrapperRef?.current?.offsetWidth;
			const windowWidth = window.innerWidth;

			if (!snippetWrapperWidth) return;

			const snippetWrapperWidthPercentage = (snippetWrapperWidth / windowWidth) * 100;

			const ratioHeight = (window.innerWidth / 100) * snippetWrapperWidthPercentage * (9 / 16);
			document.documentElement.style.setProperty('--ratio-height', `${ratioHeight}px`);
			setRatioHeight(ratioHeight);
		});

		const timer = setTimeout(() => {
			setIsPlaying(true);
			muxPlayerRef?.current?.play();
		}, 2000);

		return () => {
			window.removeEventListener('resize', () => {});
			clearTimeout(timer);
			clearTimeout(timer2);
		}
	}, []);

	return (
		<ProjectSnippetWrapper
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
			$isExpanded={isExpanded}
			$hasVisited={hasVisited}
			$isPhotographyFooter={isPhotographyFooter}
		>
			<Inner
				$isExpanded={isExpanded}
				$ratioHeight={ratioHeight}
			>


				{/* Minimised Controls */}
				<PlayTrigger
					onClick={() => setIsPlaying(!isPlaying)}
				>
					Play
				</PlayTrigger>
				<Loading isLoading={isLoading} />
				<MuteControls
					isMuted={isMuted}
					isActive={isHovered && !isExpanded && type === 'production'}
					setIsMuted={setIsMuted}
				/>
				<ExpandTrigger
					isActive={isHovered && !isExpanded}
					setIsExpanded={setIsExpanded}
					isProduction={type === 'production'}
					snippetData={snippetData}
				/>
				<MinimisedProgressTimer
					isActive={isHovered && !isExpanded && type === 'production'}
					currentTime={currentTime}
					videoLength={videoLength}
				/>


				{/* Expanded Controls */}
				<ExpandedVideoControls
					isExpanded={isExpanded}
					isMuted={isMuted}
					isPlaying={isPlaying}
					currentTime={currentTime}
					videoLength={videoLength}
					data={snippetData}
					hasNextProject={hasNextProject}
					hasPreviousProject={hasPreviousProject}
					setIsExpanded={setIsExpanded}
					setIsMuted={setIsMuted}
					setIsPlaying={setIsPlaying}
					handleSeek={handleSeek}
					handleNextProject={handleNextProject}
					handlePreviousProject={handlePreviousProject}
				/>


				{data && (
					<SnippetWrapper
						$isLoading={isLoading}
						className="snippet-wrapper"
						ref={snippetWrapperRef}
						key={muxKey}
					>

						{type === 'production' && (
							<MuxPlayer
								key={muxKey}
								ref={muxPlayerRef}
								streamType="on-demand"
								playbackId={data}
								autoPlay="muted"
								loop={true}
								thumbnailTime={0}
								preload="auto"
								muted={isMuted}
								playsInline={true}
								style={{ aspectRatio: 16/9 }}
								onLoadStart={() => setIsLoading(true)}
								onPlaying={() => setIsLoading(false)}
							/>
						)}

						{type === 'photography' && (
							<Image
								src={data}
								layout="fill"
								objectFit="cover"
								priority={true}
							/>
						)}

					</SnippetWrapper>
				)}


			</Inner>
		</ProjectSnippetWrapper>
	);
};

export default ProjectSnippet;
