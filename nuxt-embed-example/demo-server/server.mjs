import express from 'express'
import fetch from 'node-fetch'

const app = express()
app.use(express.json())

const NUXT_URL = 'http://localhost:3000'

app.get('/', async (_req, res) => {
  try {
    const payload = {
      menu: [
        { label: 'Domů', url: '/' },
        { label: 'Produkty', url: '/products' }
      ],
      user: { name: 'David z Node demo' },
      blocks: [
        {
          type: 'hero',
          props: {
            title: 'Stránka přes Node demo server',
            subtitle: 'Payload jde z Node -> Nuxt -> HTML'
          }
        },
        {
          type: 'productList',
          props: {
            title: 'Top produkty z Node',
            items: [
              { name: 'Jablko', price: 10 },
              { name: 'Chleba', price: 30 }
            ]
          }
        }
      ]
    }

    const nuxtResponse = await fetch(`${NUXT_URL}/render-page`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload })
    })

    if (!nuxtResponse.ok) {
      const text = await nuxtResponse.text()
      console.error('Nuxt error:', nuxtResponse.status, text)
      return res.status(500).send('Nuxt render error')
    }

    const data = await nuxtResponse.json()
    const htmlFragment = data.html

    res.send(`<!doctype html>
<html lang="cs">
  <head>
    <meta charset="utf-8">
    <title>Node demo + Nuxt render-page</title>
  </head>
  <body>
    ${htmlFragment}
  </body>
</html>`)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

app.get('/hero-demo', async (_req, res) => {
  const props = {
    title: 'Single hero blok z Node',
    subtitle: 'Render přes /render-block'
  }

  const propsString = encodeURIComponent(JSON.stringify(props))
  const resp = await fetch(`${NUXT_URL}/render-block?component=hero&props=${propsString}`)
  const html = await resp.text()

  res.send(`<!doctype html>
<html lang="cs">
  <head>
    <meta charset="utf-8">
    <title>Single block demo</title>
  </head>
  <body>
    ${html}
  </body>
</html>`)
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Node demo server listening on http://localhost:${PORT}`)
})
