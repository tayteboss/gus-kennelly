import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	isActive: boolean;
};

const AvailableForWorkWrapper = styled.div`
	display: flex;
	align-items: center;
	column-gap: ${pxToRem(8)};
`;

const AvailableForWork = ({ isActive }: Props) => {
	return (
		<AvailableForWorkWrapper>
			{isActive ? 'Available for work' : 'Not available'}
		</AvailableForWorkWrapper>
	);
};

export default AvailableForWork;
