import styled from 'styled-components';
import PauseSvg from '../../Svgs/PauseSvg';
import PlaySvg from '../../Svgs/PlaySvg/PlaySvg';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	setIsPlaying: (isPlaying: boolean) => void;
	isPlaying: boolean;
}

const PlayTriggerWrapper = styled.button`
	display: flex;
	align-items: center;
	column-gap: ${pxToRem(4)};
	color: var(--colour-white);
	width: 43px;
	margin-right: ${pxToRem(16)};
	text-align: left;
`;

const PlayTrigger = (props: Props) => {
	const {
		setIsPlaying,
		isPlaying
	} = props;

	return (
		<PlayTriggerWrapper onClick={() => setIsPlaying(!isPlaying)}>
			{isPlaying ? 'Pause' : 'Play'}
			{isPlaying ? (
				<PauseSvg />
			) : (
				<PlaySvg />
			)}
		</PlayTriggerWrapper>
	);
};

export default PlayTrigger;
