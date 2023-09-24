import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import Link from 'next/link';
import pxToRem from '../../../utils/pxToRem';
import InformationElement from '../../elements/InformationElement';
import { SiteSettingsType } from '../../../shared/types/types';
import LinkSwap from '../../elements/LinkSwap';
import Credit from '../../elements/Credit';

type Props = {
	siteSettings: SiteSettingsType;
};

const PhotographyBottomFooterWrapper = styled.div``;

const Inner = styled.div``;

const LogoLink = styled.a`
	text-decoration: none;
	margin-bottom: ${pxToRem(32)};
	display: inline-block;
`;

const FlexBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		.information-element {
			margin-bottom: 0;
		}
	}
`;

const PhotographyBottomFooter = (props: Props) => {
	const {
		siteSettings,
	} = props;

	if (!siteSettings) return <></>;

	const {
		email,
		phone,
		instagram,
		instagramHandle
	} = siteSettings;

	return (
		<PhotographyBottomFooterWrapper>
			<LayoutWrapper>
				<Inner>
					<Link href="/" passHref scroll={false}>
						<LogoLink>Gus Kennelly</LogoLink>
					</Link>
					<FlexBox>
						<InformationElement title="Contact + Social">
							{email && (
								<LinkSwap
									initial="Email"
									swap={email}
									link={`mailto: ${email}`}
								/>
							)}
							{phone && (
								<LinkSwap
									initial="Phone"
									swap={phone}
									link={`tel:${phone}`}
								/>
							)}
							{instagram && (
								<LinkSwap
									initial="Instagram"
									swap={instagramHandle}
									link={instagram}
								/>
							)}
						</InformationElement>
						<Credit />
					</FlexBox>
				</Inner>
			</LayoutWrapper>
		</PhotographyBottomFooterWrapper>
	);
};

export default PhotographyBottomFooter;
