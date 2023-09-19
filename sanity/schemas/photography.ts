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
			title: 'Image Gallery',
			name: 'imageGallery',
			type: 'array',
			of: [
				{
					title: "Image",
					name: "image",
					type: "image",
				}
			],
			options: {
				layout: 'grid',
			},
		},
		{
			title: 'Featured Image',
			name: 'featuredImage',
			type: 'image',
		}
	]
}