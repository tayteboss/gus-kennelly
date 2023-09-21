import styled from 'styled-components';
import { ImageType } from '../../../shared/types/types';
import Image from 'next/image';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

type Props = {
	data: ImageType;
	isPriority: boolean;
};

const SingleImageCardWrapper = styled.div`
	width: 100%;
	padding-top: 56.25%;
	position: relative;
	overflow: hidden;
	border-radius: ${pxToRem(6)};
`;

const Inner = styled.div`
	position: absolute;
	inset: 0;
	background: var(--colour-white);
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

	return (
		<SingleImageCardWrapper ref={ref}>
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
