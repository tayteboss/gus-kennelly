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
	vimeo: string;
};

export type MuxMediaType = {
	asset: {
		playbackId: string;
	};
};

export type ProductionType = {
	_id: string;
	description: [];
	awards: [];
	credits: [];
	category: string;
	featured: boolean;
	media: MuxMediaType;
	snippet: MuxMediaType;
	slug: {
		current: string;
	};
	title: string;
	year: number;
	_type: string;
	client: string;
};

export type ImageType = {
	imageType: string;
	singleImageUrl?: string;
	twoImagesUrls: string[];
	useLandscapeImage: boolean;
}

export type PhotographyType = {
	_id: string;
	category: string;
	client: string;
	featured: boolean;
	imageGallery: ImageType[];
	slug: {
		current: string;
	};
	title: string;
	year: number;
	featuredImage: {};
};
