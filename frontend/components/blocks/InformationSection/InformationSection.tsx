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
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from '../../../hooks/useClickOutside';
import useViewportWidth from '../../../hooks/useViewportWidth';

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

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		position: relative;
		z-index: 20;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		-webkit-transform: translateZ(0);
		backface-visibility: hidden;
		perspective: 1000;
		transform: translate3d(0,0,0);
		transform: translateZ(0);
	}
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
`;

const MiddleWrapper = styled.div`
	grid-column: 5 / 9;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 5 / 11;
	}
`;

const Tagline = styled(motion.p)`
	margin-bottom: ${pxToRem(32)};
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
	position: relative;
`;

const AOCWrapper = styled(motion.div)``;

const AOC = styled.p`
	color: var(--colour-black);
	margin-bottom: ${pxToRem(8)};
`;

const Hint = styled.p`
	color: var(--colour-black-600);
`;

const MotionOuterWrapper = styled(motion.div)``;

const MotionInnerWrapper = styled(motion.div)`
	padding-top: ${pxToRem(24)};
`;

const ShowMoreTrigger = styled.button`
	position: absolute;
	bottom: 0;
	right: 0;
	text-align: right;
	padding: 0 ${pxToRem(8)};
	background: var(--colour-black);
	color: var(--colour-white);
	border-radius: 100px;
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

const outerVariants = {
	hidden: {
		height: 0,
		transition: {
			duration: 0.5,
			ease: 'easeInOut'
		}
	},
	visible: {
		height: 'auto',
		transition: {
			duration: 0.5,
			ease: 'easeInOut'
		}
	}
};

const innerVariants = {
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
			ease: 'easeInOut'
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
		vimeo,
		setHasVisited
	} = props;

	const [mobileShowMore, setMobileShowMore] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const viewportWidth = useViewportWidth();

	const ref = useRef<HTMLDivElement>(null!);

	useClickOutside(ref, () => {
		if (!mobileShowMore) return;
		setMobileShowMore(false);
	});

	const handleClick = () => {
		if (hasVisited) return;
		setHasVisited(true);
		Cookies.set('visited', 'true', { expires: 1, path: '' });
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!hasVisited && aoc) {
				setHasVisited(true);
				Cookies.set('visited', 'true', { expires: 1, path: '' });
			}
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (viewportWidth === 'mobile') {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [viewportWidth]);

	useEffect(() => {
		const hasCookies = Cookies.get('visited');
	
		if (hasCookies) {
			setHasVisited(true);
		}

		if (ref?.current) {
			const height = ref.current.offsetHeight;
			document.documentElement.style.setProperty('--information-height', `${height}px`);
		}

		window.addEventListener('resize', () => {
			if (ref?.current) {
				const height = ref.current.offsetHeight;
				document.documentElement.style.setProperty('--information-height', `${height}px`);
			}
		});

		return () => {
			window.removeEventListener('resize', () => {});
		}
	}, [hasVisited]);

	return (
		<InformationSectionWrapper
			variants={wrapperVariants}
			initial='visible'
			animate={!hasVisited ? 'visible' : 'hidden'}
			onClick={() => handleClick()}
			$hasVisited={hasVisited}
			className="performance"
		>
			<Inner ref={ref}>
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
													isMobile={isMobile}
												/>
											)}
											{phone && (
												<LinkSwap
													initial="Phone"
													swap={phone}
													link={`tel:${phone}`}
													isMobile={isMobile}
												/>
											)}
											{instagram && (
												<LinkSwap
													initial="Instagram"
													swap={instagramHandle}
													link={instagram}
													isMobile={isMobile}
												/>
											)}
											{vimeo && (
												<LinkSwap
													initial="Vimeo"
													swap="Vimeo"
													link={vimeo}
													isMobile={isMobile}
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
											<Hint>Click anywhere to continue</Hint>
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
											<Credit
												key={6}
												isMobile={isMobile}
											/>
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
							{(!hasVisited && aoc) && (
								<AOCWrapper
									key={4}
									variants={childVariants}
									initial='hidden'
									animate='visible'
									exit='hidden'
								>
									<AOC>{aoc}</AOC>
									<Hint>Click anywhere to continue</Hint>
								</AOCWrapper>
							)}
							{hasVisited && (
								<>
									<ShowMoreTrigger
										onClick={() => setMobileShowMore(!mobileShowMore)}
									>
										See {mobileShowMore ? 'Less' : 'More'}
									</ShowMoreTrigger>
									<MotionOuterWrapper
										variants={outerVariants}
										initial='hidden'
										animate={mobileShowMore ? 'visible' : 'hidden'}
									>
										<MotionInnerWrapper variants={innerVariants}>
											<InformationElement title="Contact + Social">
												{email && (
													<LinkSwap
														initial="Email"
														swap={email}
														link={`mailto: ${email}`}
														isMobile={isMobile}
													/>
												)}
												{phone && (
													<LinkSwap
														initial="Phone"
														swap={phone}
														link={`tel:${phone}`}
														isMobile={isMobile}
													/>
												)}
												{instagram && (
													<LinkSwap
														initial="Instagram"
														swap={instagramHandle}
														link={instagram}
														isMobile={isMobile}
													/>
												)}
												{vimeo && (
													<LinkSwap
														initial="Vimeo"
														swap="Vimeo"
														link={vimeo}
														isMobile={isMobile}
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
											<Credit
												key={6}
												isMobile={isMobile}
											/>
										</MotionInnerWrapper>
									</MotionOuterWrapper>
								</>
							)}
						</MobileBottomWrapper>
					</MobileWrapper>
				</LayoutWrapper>
			</Inner>
		</InformationSectionWrapper>
	);
};

export default InformationSection;
