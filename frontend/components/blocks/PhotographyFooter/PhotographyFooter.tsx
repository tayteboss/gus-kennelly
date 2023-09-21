import styled from 'styled-components';
import ProjectsIndex from '../ProjectsIndex';
import { useEffect, useRef, useState } from 'react';
import { PhotographyType, ProductionType, SiteSettingsType } from '../../../shared/types/types';
import PhotographyBottomFooter from '../PhotographyBottomFooter';
import ProjectSnippet from '../ProjectSnippet';
import BackHomeLink from '../../elements/BackHomeLink';
import pxToRem from '../../../utils/pxToRem';

type StyledProps = {
	$bgColour?: string;
	$topSectionHeight?: number;
};

type Props = {
	bgColour: string;
	featuredPhotographyData: PhotographyType[];
	photographyData: PhotographyType[];
	siteSettings: SiteSettingsType;
};

const PhotographyFooterWrapper = styled.div<StyledProps>`
	background: ${(props: any) => props.$bgColour};
	padding: ${pxToRem(16)} 0;
`;

const TopSection = styled.div<StyledProps>`
	position: relative;
	margin-bottom: ${(props) => `calc(var(--ratio-height) - ${props.$topSectionHeight}px)`};
`;

const PhotographyFooter = (props: Props) => {
	const {
		bgColour,
		featuredPhotographyData,
		photographyData,
		siteSettings
	} = props;

	const [snippetData, setSnippetData] = useState<ProductionType | PhotographyType | undefined>(featuredPhotographyData ? featuredPhotographyData[0] : undefined);
	const [topSectionHeight, setTopSectionHeight] = useState(0);

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			setTopSectionHeight(ref.current.clientHeight);
		}
	}, []);

	return (
		<PhotographyFooterWrapper $bgColour={bgColour}>
			<TopSection
				ref={ref}
				$topSectionHeight={topSectionHeight}
			>
				<ProjectsIndex
					photographyData={photographyData}
					featuredPhotographyData={featuredPhotographyData}
					photographyColour={bgColour}
					siteSettings={siteSettings}
					hasVisited={true}
					setSnippetData={setSnippetData}
					isPhotographyFooter
				/>
				<ProjectSnippet
					snippetData={snippetData}
					hasVisited={true}
				/>
			</TopSection>
			<BackHomeLink />
			<PhotographyBottomFooter siteSettings={siteSettings} />
		</PhotographyFooterWrapper>
	);
};

export default PhotographyFooter;
