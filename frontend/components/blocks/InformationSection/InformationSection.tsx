import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import LinkSwap from '../../elements/LinkSwap';
import InformationElement from '../../elements/InformationElement';
import pxToRem from '../../../utils/pxToRem';
import { PortableText } from '@portabletext/react';
import AvailableForWork from '../../elements/AvailableForWork';
import Credit from '../../elements/Credit'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type StyledProps = {
	$hasVisited: boolean;
};

type Props = {
	tagline: string;
	email: string;
	phone: string;
	instagram: string;
	aoc: string;
	availableForWork: boolean;
	about: [];
	instagramHandle: string;
	hasVisited: boolean;
	setHasVisited: (hasVisited: boolean) => void;
};

const InformationSectionWrapper = styled(motion.section)<StyledProps>`
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 500;
	width: 100%;
	background: var(--colour-white);
	border-top-left-radius: ${pxToRem(6)};
	border-top-right-radius: ${pxToRem(6)};
	cursor: ${(props) => props.$hasVisited ? 'default' : 'pointer'};
`;

const Inner = styled.div`
	padding: ${pxToRem(16)} 0;
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

const MiddleWrapper = styled.div`
	grid-column: 5 / 9;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 5 / 11;
	}
`;

const Tagline = styled(motion.p)`
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

const AOCWrapper = styled(motion.div)``;

const AOC = styled.p`
	color: var(--colour-black);
	margin-bottom: ${pxToRem(8)};
`;

const Hint = styled.p`
	color: var(--colour-black-600);
`;

const wrapperVariants = {
	hidden: {
		height: 'auto',
		transition: {
			duration: 0.8,
			ease: 'easeInOut',
		}
	},
	visible: {
		height: '95vh',
		transition: {
			duration: 0.8,
			ease: 'easeInOut',
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay: 0.5
		}
	}
};

const InformationSection = (props: Props) => {
	const {
		tagline,
		email,
		phone,
		instagram,
		availableForWork,
		about,
		instagramHandle,
		aoc,
		hasVisited,
		setHasVisited
	} = props;

	const handleClick = () => {
		if (hasVisited) return;
		setHasVisited(true);
		Cookies.set('visited', 'true', { expires: 1, path: '' });
	};

	useEffect(() => {
		const hasCookies = Cookies.get('visited');
	
		if (hasCookies) {
			setHasVisited(true);
		}
	}, []);

	return (
		<InformationSectionWrapper
			variants={wrapperVariants}
			initial='visible'
			animate={!hasVisited ? 'visible' : 'hidden'}
			onClick={() => handleClick()}
			$hasVisited={hasVisited}
		>
			<Inner>
				<LayoutWrapper>
					<DesktopWrapper>
						<AnimatePresence mode="wait">
							<LayoutGrid>
								<LeftWrapper>
									<Logo>Gus Kennelly</Logo>
									{hasVisited && (
										<InformationElement title="Contact + Social" key={1}>
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
									)}
								</LeftWrapper>
								<MiddleWrapper>
									{hasVisited && (
										<>
											{tagline && (
												<Tagline
													key={2}
													variants={childVariants}
													initial='hidden'
													animate='visible'
													exit='hidden'
												>
													{tagline}
												</Tagline>
											)}
											<InformationElement
												title="About"
												key={3}
											>
												{about && (
													<PortableText
														value={about}
													/>
												)}
											</InformationElement>
										</>
									)}
									{(!hasVisited && aoc) && (
										<AOCWrapper
											key={4}
											variants={childVariants}
											initial='hidden'
											animate='visible'
											exit='hidden'
										>
											<AOC>{aoc}</AOC>
											<Hint>Click anywhere to contiue</Hint>
										</AOCWrapper>
									)}
								</MiddleWrapper>
								<RightWrapper>
									{hasVisited && (
										<>
											<AvailableForWork
												isActive={availableForWork}
												key={5}
											/>
											<Credit key={6} />
										</>
									)}
								</RightWrapper>
							</LayoutGrid>
						</AnimatePresence>
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
			</Inner>
		</InformationSectionWrapper>
	);
};

export default InformationSection;
