// Schema para los productos de la tienda
export default {
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre del producto',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string'
    }
  ]
}