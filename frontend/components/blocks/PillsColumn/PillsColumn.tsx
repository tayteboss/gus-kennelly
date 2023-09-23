import styled from 'styled-components';
import Pill from '../../elements/Pill';
import { PhotographyType, ProductionType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';

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

const DesktopPillsColumnWrapper = styled.div`
	grid-column: span 2;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: span 2;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		grid-column: 1 / -1;
		flex-direction: row;
		column-gap: ${pxToRem(1)};
		row-gap: ${pxToRem(4)};
		flex-wrap: wrap;

		&::after {
			content: '';
			position: absolute;
			bottom: -8px;
			left: -8px;
			width: calc(100% + 16px);
			height: 1px;
			background: var(--colour-black);
		}
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

	const hasProjectData = projectPills && projectPills.length > 0;

	return (
		<>
			<DesktopPillsColumnWrapper className="pill-column">

				{(isProjectTypeColumn) && (
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

				{(isCategoryColumn) && (
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

				{(isProjectsColumn) && (
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

			</DesktopPillsColumnWrapper>
		</>

	);
};

export default PillsColumn;
