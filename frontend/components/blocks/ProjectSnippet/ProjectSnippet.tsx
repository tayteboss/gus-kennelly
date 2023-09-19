import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import MuxPlayer from '@mux/mux-player-react';
import { useEffect, useState } from 'react';
import Loading from '../../elements/Loading';
import ExpandTrigger from '../../elements/ExpandTrigger';
import MuteControls from '../../elements/MuteControls';
import ExpandedVideoControls from '../ExpandedVideoControls';

type StyledProps = {
	$isLoading?: boolean;
	$isExpanded?: boolean;
	$ratioHeight?: number;
};

type Props = {
	snippetData: any;
};

const ProjectSnippetWrapper = styled.div<StyledProps>`
	position: absolute;
	top: 16px;
	right: 16px;
	transform: ${(props) => props.$isExpanded ? 'translate(16px, -16px)' : 'translate(0, 0)'};
	z-index: 100;

	transition: all var(--transition-speed-extra-slow) var(--transition-ease);
`;

const Inner = styled.div<StyledProps>`
	height: ${(props) => props.$isExpanded ? '100vh' : `${props.$ratioHeight}px`};
	width: ${(props) => props.$isExpanded ? '100vw' : '41.6666666667vw'};
	position: relative;
	border-radius: ${(props) => props.$isExpanded ? 0 : pxToRem(6)};
	overflow: hidden;

	transition: all var(--transition-speed-extra-slow) var(--transition-ease);
`;

const SnippetWrapper = styled.div<StyledProps>`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	filter: ${(props) => props.$isLoading ? 'brightness(0.5) blur(1px)' : 'brightness(1) blur(0px)'};
	transform: ${(props) => props.$isLoading ? 'scale(1.01)' : 'scale(1)'};

	transition: filter 500ms var(--transition-ease), transform 2000ms var(--transition-ease);

	mux-player {
		--media-object-fit: cover;
		--media-object-position: center;
		--controls: none;

		height: 100%;
		width: 100%;

		transition: all var(--transition-speed-slow) var(--transition-ease);
	}
`;

const Image = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
`;

const ProjectSnippet = (props: Props) => {
	const {
		snippetData
	} = props;

	const [isLoading, setIsLoading] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [ratioHeight, setRatioHeight] = useState(0);

	const type = snippetData._type;
	let data: string = '';

	if (type === 'production') {
		data = snippetData?.media?.asset?.playbackId;
	} else {
		data = snippetData?.featuredImage;
	}

	const handleClick = () => {
		if (snippetData?._type === 'production') return;
	}

	useEffect(() => {
		const ratioHeight = (window.innerWidth / 100) * 41.6666666667 * (9 / 16);
		setRatioHeight(ratioHeight);
	}, []);

	useEffect(() => {
		const body = document.querySelector('body');

		if (!body) return;

		if (isExpanded) {
			body.classList.add('project-is-expanded');
		} else {
			body.classList.remove('project-is-expanded');
		}
	}, [isExpanded]);

	return (
		<ProjectSnippetWrapper
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
			onClick={() => handleClick()}
			$isExpanded={isExpanded}
		>
			<Inner
				$isExpanded={isExpanded}
				$ratioHeight={ratioHeight}
			>


				<Loading isLoading={isLoading} />
				<MuteControls
					isMuted={isMuted}
					isActive={isHovered && !isExpanded}
					setIsMuted={setIsMuted}
				/>
				<ExpandTrigger
					isActive={isHovered && !isExpanded}
					setIsExpanded={setIsExpanded}
				/>


				<ExpandedVideoControls
					isExpanded={isExpanded}
					setIsExpanded={setIsExpanded}
					data={snippetData}
				/>


				{data.length > 0 && (
					<SnippetWrapper
						$isLoading={isLoading}
						className="snippet-wrapper"
					>

						{type === 'production' && (
							<MuxPlayer
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
							<Image src={data} />
						)}

					</SnippetWrapper>
				)}


			</Inner>
		</ProjectSnippetWrapper>
	);
};

export default ProjectSnippet;