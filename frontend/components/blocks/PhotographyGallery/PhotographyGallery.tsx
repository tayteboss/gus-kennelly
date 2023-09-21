import styled from 'styled-components';
import { PhotographyType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import SingleImageCard from '../../elements/SingleImageCard';
import DoubleImageCard from '../../elements/DoubleImageCard';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: PhotographyType;
};

const PhotographyGalleryWrapper = styled.section`
	padding: ${pxToRem(50)} 0 ${pxToRem(16)};
`;

const Inner = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: ${pxToRem(16)};
`;

const PhotographyGallery = (props: Props) => {
	const {
		data,
	} = props;

	const hasGalleryData = data?.imageGallery?.length > 0;

	return (
		<PhotographyGalleryWrapper>
			<LayoutWrapper>
				<Inner>
					{hasGalleryData && data?.imageGallery?.map((item, i) => {
						const isSingleImage = item?.imageType === 'Single Image';

						return (
							isSingleImage ? (
								<SingleImageCard
									data={item}
									key={i}
									isPriority={i === 0}
								/>
							) : (
								<DoubleImageCard
									data={item}
									key={i}
									isPriority={i === 0}
								/>
							)
						);
					})}
				</Inner>
			</LayoutWrapper>
		</PhotographyGalleryWrapper>
	);
};

export default PhotographyGallery;
