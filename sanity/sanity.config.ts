import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { colorInput } from '@sanity/color-input';
import { muxInput } from 'sanity-plugin-mux-input';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

export default defineConfig({
  name: 'default',
  title: 'Gus Kennelly',

  projectId: 'fyltl5gl',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
        .title('Content')
        .items([
          orderableDocumentListDeskItem({type: 'production', S, context}),
          orderableDocumentListDeskItem({type: 'photography', S, context}),
          S.divider(),
          S.listItem()
            .title('Site Settings')
            .child(
              S.editor()
                .schemaType('siteSettings')
                .documentId('siteSettings')
            ),
          // Add a visual divider (optional)
          S.divider(),
          // List out the rest of the document types, but filter out the config type
          ...S.documentTypeListItems()
            .filter(listItem => !['siteSettings'].includes(listItem.getId()))
        ])
      },
    }),
    visionTool(),
    colorInput(),
    muxInput({mp4_support: 'standard'}),
    vercelDeployTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
