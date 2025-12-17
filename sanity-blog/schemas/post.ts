import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // Slug único (no traducido)
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'URL amigable del post (ej: "como-ahorrar-dinero")',
      options: {
        source: 'title.es',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Títulos en cada idioma
    defineField({
      name: 'title',
      title: 'Título',
      type: 'object',
      fields: [
        {name: 'es', title: 'Español', type: 'string'},
        {name: 'en', title: 'English', type: 'string'},
        {name: 'pt', title: 'Português', type: 'string'},
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Extracto/resumen en cada idioma
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'object',
      description: 'Breve descripción que aparece en la card del blog',
      fields: [
        {name: 'es', title: 'Español', type: 'text', rows: 3},
        {name: 'en', title: 'English', type: 'text', rows: 3},
        {name: 'pt', title: 'Português', type: 'text', rows: 3},
      ],
    }),

    // Contenido completo en cada idioma (Portable Text)
    defineField({
      name: 'body',
      title: 'Contenido (Editor)',
      type: 'object',
      description: 'Usa el editor enriquecido para escribir el contenido',
      fields: [
        {
          name: 'es',
          title: 'Español',
          type: 'array',
          of: [
            {type: 'block'},
            {type: 'image', options: {hotspot: true}},
          ],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            {type: 'block'},
            {type: 'image', options: {hotspot: true}},
          ],
        },
        {
          name: 'pt',
          title: 'Português',
          type: 'array',
          of: [
            {type: 'block'},
            {type: 'image', options: {hotspot: true}},
          ],
        },
      ],
    }),

    // HTML directo (alternativa al editor)
    defineField({
      name: 'rawHtml',
      title: 'Contenido HTML (Alternativo)',
      type: 'object',
      description: '⚠️ Usa esto SOLO si prefieres pegar HTML directamente en vez del editor',
      fields: [
        {name: 'es', title: 'HTML Español', type: 'text', rows: 15},
        {name: 'en', title: 'HTML English', type: 'text', rows: 15},
        {name: 'pt', title: 'HTML Português', type: 'text', rows: 15},
      ],
    }),

    // Imagen destacada
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
        },
      ],
    }),

    // Autor
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{type: 'author'}],
    }),

    // Categorías
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),

    // Fecha de publicación
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // Estado de publicación
    defineField({
      name: 'isPublished',
      title: 'Publicado',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title.es',
      author: 'author.name',
      media: 'mainImage',
      published: 'isPublished',
    },
    prepare(selection) {
      const {title, author, media, published} = selection
      return {
        title: `${published ? '✓' : '○'} ${title}`,
        subtitle: author ? `por ${author}` : 'Sin autor',
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Fecha de publicación (más reciente)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
