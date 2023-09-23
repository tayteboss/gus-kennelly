import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	currentTime: number;
	videoLength: number;
	handleSeek: (time: number) => void;
};

const SeekBarWrapper = styled.div`
	flex: 1;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: ${pxToRem(32)};

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		column-gap: ${pxToRem(8)};
	}
`;

const SeekBarInner = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	cursor: pointer;
`;

const FullBar = styled.div`
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	z-index: 1;
	background: var(--colour-white);
	opacity: 0.5;
	width: 100%;
	height: 1px;
	border-radius: 5px;
`;

const CurrentTimeBar = styled.div`
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	z-index: 2;
	background: var(--colour-white);
	height: 1px;
	border-radius: 5px;

	transition: all 300ms linear;
`;

const ProgressWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	column-gap: ${pxToRem(4)};
	min-width: 90px;
`;

const Current = styled.div``;

const Divider = styled.div``;

const VideoLength = styled.div``;

const SeekBar = (props: Props) => {
	const {
		currentTime,
		videoLength,
		handleSeek
	} = props;

	const [currentTimeFormatted, setCurrentTimeFormated] = useState('00:00');
	const [videoLengthFormatted, setVideoLengthFormated] = useState('00:00');

	const currentTimePercentage = (currentTime / videoLength) * 100;

	const handleSeekBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const bar = e.currentTarget;
		const clickX = e.clientX - bar.getBoundingClientRect().left;
		const newTime = (clickX / bar.clientWidth) * videoLength;
		handleSeek(newTime);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60).toString().padStart(2, '0');
		const seconds = Math.floor(time % 60).toString().padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	useEffect(() => {
		const currentTimeFormatted = formatTime(Math.floor(currentTime));
		const videoLengthFormatted = formatTime(Math.floor(videoLength));
		setCurrentTimeFormated(currentTimeFormatted);
		setVideoLengthFormated(videoLengthFormatted);
	}, [currentTime]);
	

	return (
		<SeekBarWrapper onClick={handleSeekBarClick}>
			<SeekBarInner>
				<FullBar />
				<CurrentTimeBar style={{ width: `${currentTimePercentage}%` }} />
			</SeekBarInner>
			<ProgressWrapper>
				<Current>{currentTimeFormatted}</Current>
				<Divider> / </Divider>
				<VideoLength>{videoLengthFormatted}</VideoLength>
			</ProgressWrapper>
		</SeekBarWrapper>
	);
};

export default SeekBar;
