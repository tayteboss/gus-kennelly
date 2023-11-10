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

const SingleImageCardWrapper = styled.div<StyledProps>`
	width: 100%;
	padding-top: ${(props) => props.$useLandscape ? '56.25%' : '150%'};
	position: relative;
	overflow: hidden;
	border-radius: ${pxToRem(6)};
`;

const Inner = styled.div`
	position: absolute;
	inset: 0;
`;

const SingleImageCard = (props: Props) => {
	const {
		data,
		isPriority
	} = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	console.log('data', data);
	

	return (
		<SingleImageCardWrapper
			ref={ref}
			$useLandscape={data?.useLandscapeImage}
		>
			{data.singleImageUrl && (
				<Inner
					className={`view-element-bottom-top ${
						inView ? 'view-element-bottom-top--in-view' : ''
					}`}
				>
					<Image
						src={data.singleImageUrl}
						layout="fill"
						objectFit="cover"
						priority={isPriority}
					/>
				</Inner>
			)}
		</SingleImageCardWrapper>
	);
};

export default SingleImageCard;
