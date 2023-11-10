import styled from 'styled-components';
import { ImageType } from '../../../shared/types/types';
import Image from 'next/image';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

type StyledProps = {
	$useLandscape: boolean;
};

type Props = {
	data: ImageType;
	isPriority: boolean;
};

const DoubleImageCardWrapper = styled.div`
	width: 100%;
	display: flex;
	column-gap: ${pxToRem(16)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		column-gap: ${pxToRem(8)};
		flex-direction: column;
		row-gap: ${pxToRem(16)};
	}
`;

const Outer = styled.div`
	width: 100%;
	flex: 1;
	position: relative;
	overflow: hidden;
	border-radius: ${pxToRem(6)};
`;

const Inner = styled.div<StyledProps>`
	padding-top: ${(props) => props.$useLandscape ? '56.25%' : '150%'};
`;

const DoubleImageCard = (props: Props) => {
	const {
		data,
		isPriority
	} = props;

	const hasImages = data?.twoImagesUrls?.length === 2;
	const images = data?.twoImagesUrls;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<DoubleImageCardWrapper ref={ref}>
			{hasImages && images.map((item, i) => (
				<Outer
					className={`view-element-bottom-top ${
						inView ? 'view-element-bottom-top--in-view' : ''
					}`}
					key={i}
				>
					<Inner $useLandscape={data?.useLandscapeImage}>
						<Image
							src={item}
							layout="fill"
							objectFit="cover"
							priority={isPriority}
						/>
					</Inner>
				</Outer>
			))}
		</DoubleImageCardWrapper>
	);
};

export default DoubleImageCard;
