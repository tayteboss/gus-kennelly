import styled from 'styled-components';
import Pill from '../../elements/Pill';
import { PhotographyType, ProductionType } from '../../../shared/types/types';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import MobilePillsColumn from '../MobilePillsColumn';

type Props = {
	productionIsActive: boolean;
	productionColour?: string;
	photographyColour: string;
	isProjectTypeColumn?: boolean;
	isCategoryColumn?: boolean;
	isProjectsColumn?: boolean;
	activeCategory?: string;
	projectPills?: ProductionType[] | PhotographyType[];
	activeProject?: string;
	isPhotographyFooter?: boolean;
	handleChangeProjectType?: (isProduction: boolean) => void;
	handleChangeCategory?: (category: string) => void;
	handleChangeProject?: (project: string) => void;
	handleChangeProjectSnippet?: (project: ProductionType | PhotographyType) => void;
	setIsExpanded?: (isExpanded: boolean) => void;
};

const PillsColumnWrapper = styled.div`
	grid-column: span 2;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: span 2;
	}
`;

const PillsColumn = (props: Props) => {
	const {
		productionIsActive,
		productionColour,
		photographyColour,
		isProjectTypeColumn,
		isCategoryColumn,
		isProjectsColumn,
		activeCategory,
		projectPills,
		activeProject,
		isPhotographyFooter,
		handleChangeProjectType,
		handleChangeCategory,
		handleChangeProjectSnippet,
		setIsExpanded
	} = props;

	const [isMobile, setIsMobile] = useState(false);

	const hasProjectData = projectPills && projectPills.length > 0;

	const windowDimensions = useWindowDimensions();

	const checkIfMobile = () => {
		if (windowDimensions.width <= 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}

	useEffect(() => {
		checkIfMobile();

		window.addEventListener('resize', () => {
			checkIfMobile();
		});
	}, []);

	return (
		<PillsColumnWrapper className="pill-column">

			{isMobile && (
				<MobilePillsColumn />
			)}

			{(isProjectTypeColumn && !isMobile) && (
				<>
					{!isPhotographyFooter && (
						<Pill
							title="Production"
							isActive={productionIsActive}
							activeColour={productionColour ? productionColour : photographyColour}
							isProjectType
							handleChangeProjectType={handleChangeProjectType}
							columnId={1}
						/>
					)}
					<Pill
						title="Photography"
						isActive={!productionIsActive}
						activeColour={photographyColour}
						isProjectType
						handleChangeProjectType={handleChangeProjectType}
						columnId={1}
					/>
				</>
			)}

			{(isCategoryColumn && !isMobile) && (
				<>
					<Pill
						title="Featured"
						isActive={activeCategory === "featured"}
						activeColour={productionIsActive ? productionColour : photographyColour}
						isCategory
						handleChangeCategory={handleChangeCategory}
						columnId={2}
					/>
					<Pill
						title="Commercial"
						isActive={activeCategory === "commercial"}
						activeColour={productionIsActive ? productionColour : photographyColour}
						isCategory
						handleChangeCategory={handleChangeCategory}
						columnId={2}
					/>
					{productionIsActive && (
						<>
							<Pill
								title="Narrative"
								isActive={activeCategory === "narrative"}
								activeColour={productionIsActive ? productionColour : photographyColour}
								isCategory
								handleChangeCategory={handleChangeCategory}
								columnId={2}
							/>
							<Pill
								title="Music Video"
								isActive={activeCategory === "music-video"}
								activeColour={productionIsActive ? productionColour : photographyColour}
								isCategory
								handleChangeCategory={handleChangeCategory}
								columnId={2}
							/>
						</>
					)}
					{!productionIsActive && (
						<Pill
							title="Personal"
							isActive={activeCategory === "personal"}
							activeColour={productionIsActive ? productionColour : photographyColour}
							isCategory
							handleChangeCategory={handleChangeCategory}
							columnId={2}
						/>
					)}
				</>
			)}

			{(isProjectsColumn && !isMobile) && (
				hasProjectData && projectPills?.map((item, i) => (
					<Pill
						key={i}
						title={item?.title}
						slug={item?.slug?.current}
						isActive={activeProject === item.title}
						activeColour={productionIsActive ? productionColour : photographyColour}
						isProject
						projectData={item}
						isProduction={productionIsActive}
						handleChangeProjectSnippet={handleChangeProjectSnippet}
						setIsExpanded={setIsExpanded}
						columnId={3}
					/>
				))
			)}

		</PillsColumnWrapper>
	);
};

export default PillsColumn;
