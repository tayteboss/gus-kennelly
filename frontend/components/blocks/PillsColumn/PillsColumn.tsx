import styled from 'styled-components';
import Pill from '../../elements/Pill';
import { PhotographyType, ProductionType } from '../../../shared/types/types';

type Props = {
	productionIsActive: boolean;
	productionColour: string;
	photographyColour: string;
	isProjectTypeColumn?: boolean;
	isCategoryColumn?: boolean;
	isProjectsColumn?: boolean;
	activeCategory?: string;
	projectPills?: ProductionType[] | PhotographyType[];
	activeProject?: string;
	handleChangeProjectType?: (isProduction: boolean) => void;
	handleChangeCategory?: (category: string) => void;
	handleChangeProject?: (project: string) => void;
	handleChangeProjectSnippet?: (project: ProductionType | PhotographyType) => void;
};

const PillsColumnWrapper = styled.div`
	grid-column: span 2;
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
		handleChangeProjectType,
		handleChangeCategory,
		handleChangeProject,
		handleChangeProjectSnippet
	} = props;

	const hasProjectData = projectPills && projectPills.length > 0;

	return (
		<PillsColumnWrapper className="pill-column">

			{isProjectTypeColumn && (
				<>
					<Pill
						title="Production"
						isActive={productionIsActive}
						activeColour={productionColour}
						isProjectType
						handleChangeProjectType={handleChangeProjectType}
					/>
					<Pill
						title="Photography"
						isActive={!productionIsActive}
						activeColour={photographyColour}
						isProjectType
						handleChangeProjectType={handleChangeProjectType}
					/>
				</>
			)}

			{isCategoryColumn && (
				<>
					<Pill
						title="Featured"
						isActive={activeCategory === "Featured"}
						activeColour={productionIsActive ? productionColour: photographyColour}
						isCategory
						handleChangeCategory={handleChangeCategory}
					/>
					<Pill
						title="Commercial"
						isActive={activeCategory === "Commercial"}
						activeColour={productionIsActive ? productionColour: photographyColour}
						isCategory
						handleChangeCategory={handleChangeCategory}
					/>
					{productionIsActive && (
						<>
							<Pill
								title="Narrative"
								isActive={activeCategory === "Narrative"}
								activeColour={productionIsActive ? productionColour: photographyColour}
								isCategory
								handleChangeCategory={handleChangeCategory}
							/>
							<Pill
								title="Music Video"
								isActive={activeCategory === "Music Video"}
								activeColour={productionIsActive ? productionColour: photographyColour}
								isCategory
								handleChangeCategory={handleChangeCategory}
							/>
						</>
					)}
					{!productionIsActive && (
						<Pill
							title="Personal"
							isActive={activeCategory === "Personal"}
							activeColour={productionIsActive ? productionColour: photographyColour}
							isCategory
							handleChangeCategory={handleChangeCategory}
						/>
					)}
				</>
			)}

			{isProjectsColumn && (
				hasProjectData && projectPills?.map((item, i) => (
					<Pill
						key={i}
						title={item?.title}
						isActive={activeProject === item.title}
						activeColour={productionIsActive ? productionColour: photographyColour}
						isProject
						projectData={item}
						handleChangeProject={handleChangeProject}
						handleChangeProjectSnippet={handleChangeProjectSnippet}
					/>
				))
			)}

		</PillsColumnWrapper>
	);
};

export default PillsColumn;
