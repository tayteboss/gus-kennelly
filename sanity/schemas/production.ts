import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default {
	title: 'Production',
	name: 'production',
	type: 'document',
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: "production" }),
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
			title: 'Media',
			name: 'media',
			type: "mux.video",
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
					{ title: 'Music Video', value: 'music-video' },
					{ title: 'Narrative', value: 'narrative' },
				],
			},
			validation: Rule => Rule.required()
		},
		{
			title: 'Description', 
			name: 'description',
			type: 'array', 
			of: [
				{ type: 'block' }
			],
		},
		{
			title: 'Credits', 
			name: 'credits',
			type: 'array', 
			of: [
				{ type: 'block' }
			],
			marks: {
				annotations: [
					{
						name: 'link',
						type: 'object',
						title: 'External link',
						fields: [
							{
								name: 'href',
								type: 'url',
								title: 'URL'
							},
							{
								title: 'Open in new tab',
								name: 'blank',
								type: 'boolean'
							}
						]
					},
				]
			},
			styles: []
		},
		{
			title: 'Awards', 
			name: 'awards',
			type: 'array', 
			of: [
				{ type: 'block' }
			],
		},
	]
}