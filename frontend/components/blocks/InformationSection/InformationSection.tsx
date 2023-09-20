import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import LinkSwap from '../../elements/LinkSwap';
import InformationElement from '../../elements/InformationElement';
import pxToRem from '../../../utils/pxToRem';
import { PortableText } from '@portabletext/react';
import AvailableForWork from '../../elements/AvailableForWork';
import Credit from '../../elements/Credit'

type Props = {
	tagline: string;
	email: string;
	phone: string;
	instagram: string;
	aoc: string;
	availableForWork: boolean;
	about: [];
	instagramHandle: string;
};

const InformationSectionWrapper = styled.section`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: ${pxToRem(16)} 0;
	background: var(--colour-white);
	border-top-left-radius: ${pxToRem(6)};
	border-top-right-radius: ${pxToRem(6)};
`;

const DesktopWrapper = styled.div`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const LeftWrapper = styled.div`
	grid-column: 1 / 4;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
	align-items: flex-start;
`;

const Logo = styled.p`
	margin-bottom: ${pxToRem(32)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
		margin-bottom: ${pxToRem(24)};
	}
`;

const Aoc = styled.p``;

const MiddleWrapper = styled.div`
	grid-column: 5 / 9;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 5 / 11;
	}
`;

const Tagline = styled.p`
	margin-bottom: ${pxToRem(32)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(24)};
	}
`;

const RightWrapper = styled.div`
	grid-column: 11 / -1;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
	align-items: flex-end;
`;

const MobileWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}
`;

const MobileTopWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const MobileBottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: ${pxToRem(24)};
`;

const InformationSection = (props: Props) => {
	const {
		tagline,
		email,
		phone,
		instagram,
		availableForWork,
		about,
		instagramHandle
	} = props;

	return (
		<InformationSectionWrapper>
			<LayoutWrapper>
				<DesktopWrapper>
					<LayoutGrid>
						<LeftWrapper>
							<Logo>Gus Kennelly</Logo>
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
						</LeftWrapper>
						<MiddleWrapper>
							{tagline && (
								<Tagline>{tagline}</Tagline>
							)}
							<InformationElement title="About">
								{about && (
									<PortableText
										value={about}
									/>
								)}
							</InformationElement>
						</MiddleWrapper>
						<RightWrapper>
							<AvailableForWork
								isActive={availableForWork}
							/>
							<Credit />
						</RightWrapper>
					</LayoutGrid>
				</DesktopWrapper>
				<MobileWrapper>
					<MobileTopWrapper>
						<Logo>Gus Kennelly</Logo>
						{tagline && (
							<Tagline>{tagline}</Tagline>
						)}
					</MobileTopWrapper>
					<MobileBottomWrapper>
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
						<InformationElement title="About">
							{about && (
								<PortableText
									value={about}
								/>
							)}
						</InformationElement>
					</MobileBottomWrapper>
				</MobileWrapper>
			</LayoutWrapper>
		</InformationSectionWrapper>
	);
};

export default InformationSection;
