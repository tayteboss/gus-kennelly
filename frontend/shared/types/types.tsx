export type MediaType = {
	media: [
		{
			webmVideoFile: {
				url: string;
			};
			mp4VideoFile: {
				url: string;
			};
			placeholderImage: {
				url: string;
			}
		}
	];
};

export type Transitions = {
	hidden: {
		opacity: number;
		transition: {
			duration: number;
		}
	}
	visible: {
		opacity: number;
		transition: {
			duration: number;
			delay?: number
		}
	}
};

export type SiteSettingsType = {
	about: [];
	aoc: string;
	availableForWork: boolean;
	email: string;
	instagram: string;
	instagramHandle: string;
	phone: string;
	photographyColour: {
		hex: string;
	}
	productionColour: {
		hex: string;
	}
	seoDescription: string;
	tagline: string;
}
