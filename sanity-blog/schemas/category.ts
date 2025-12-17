import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'object',
      fields: [
        {name: 'es', title: 'Español', type: 'string'},
        {name: 'en', title: 'English', type: 'string'},
        {name: 'pt', title: 'Português', type: 'string'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.es',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'object',
      fields: [
        {name: 'es', title: 'Español', type: 'text', rows: 2},
        {name: 'en', title: 'English', type: 'text', rows: 2},
        {name: 'pt', title: 'Português', type: 'text', rows: 2},
      ],
    }),
    defineField({
      name: 'color',
      title: 'Color (para badge)',
      type: 'string',
      description: 'Color hexadecimal (ej: #0b80bd)',
      initialValue: '#0b80bd',
    }),
  ],
  preview: {
    select: {
      title: 'name.es',
      subtitle: 'slug.current',
    },
  },
})
