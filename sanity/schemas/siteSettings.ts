export default {
	title: "Site Settings",
	name: "siteSettings",
	type: "document",
	fields: [
		{
			title: "SEO Description",
			name: "seoDescription",
			type: "string"
		},
		{
			title: "Acknowledgement of Country",
			name: "aoc",
			type: "string"
		},
		{
			title: "Email",
			name: "email",
			type: "string"
		},
		{
			title: "Phone",
			name: "phone",
			type: "string"
		},
		{
			title: "Instagram URL",
			name: "instagram",
			type: "url"
		},
		{
			title: "Vimeo URL",
			name: "vimeo",
			type: "url"
		},
		{
			title: "About",
			name: "about",
			type: "array",
			of: [
				{
					type: "block"
				}
			]
		},
		{
			title: "Available for work",
			name: "availableForWork",
			type: "boolean"
		},
		{
			title: 'Production Colour',
			name: 'productionColour',
			type: 'color'
		},
		{
			title: 'Photography Colour',
			name: 'photographyColour',
			type: 'color'
		}
	]
}