import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default {
	title: 'Photography',
	name: 'photography',
	type: 'document',
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: "photography" }),
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 200,
				slugify: input => input
						.toLowerCase()
						.replace(/\s+/g, '-')
						.slice(0, 200)
			},
			validation: Rule => Rule.required()
		},
		{
			title: 'Featured',
			name: 'featured',
			type: 'boolean',
		},
		{
			title: 'Client',
			name: 'client',
			type: 'string'
		},
		{
			title: 'Year',
			name: 'year',
			type: 'number',
		},
		{
			title: 'Category',
			name: 'category',
			type: 'string',
			options: {
				list: [
					{ title: 'Commercial', value: 'commercial' },
					{ title: 'Personal', value: 'personal' },
				],
			},
			validation: Rule => Rule.required()
		},
		{
			name: 'imageGallery',
			title: 'Image Gallery',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'imageBlock',
					title: 'Image Block',
					fields: [
						{
							name: 'imageType',
							title: 'Image Type',
							type: 'string',
							options: {
								list: ['Single Image', 'Two Images Side by Side'],
							},
						},
						{
							name: 'singleImage',
							title: 'Single Image',
							type: 'image',
							description: 'Select a single image',
							hidden: ({ parent }) => parent?.imageType !== 'Single Image',
						},
						{
							name: 'twoImages',
							title: 'Two Images',
							type: 'array',
							of: [{ type: 'image' }],
							description: 'Select two images to display side by side',
							hidden: ({ parent }) => parent?.imageType !== 'Two Images Side by Side',
							validation: (Rule) =>
								Rule.custom((images) => {
								if (images && images.length !== 2) {
									return 'You must select exactly two images for Two Images Side by Side.';
								}
									return true;
								}),
						},
						{
							title: 'Use Landscape Image',
							name: 'useLandscapeImage',
							type: 'boolean',
						}
					],
				},
			],
		},
		{
			title: 'Featured Image',
			name: 'featuredImage',
			type: 'image',
		}
	]
}