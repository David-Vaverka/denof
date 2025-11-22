export default defineEventHandler(async () => {
  const payload = {
    menu: [
      { label: 'Domů', url: '/' },
      { label: 'Produkty', url: '/products' }
    ],
    user: { name: 'David' },
    blocks: [
      {
        type: 'hero',
        props: {
          title: 'Homepage z čistého Nuxt 3',
          subtitle: 'Data jdou z /api/page-home'
        }
      },
      {
        type: 'productList',
        props: {
          title: 'Top produkty',
          items: [
            { name: 'Jablko', price: 10 },
            { name: 'Chleba', price: 30 }
          ]
        }
      }
    ]
  }

  return payload
})
