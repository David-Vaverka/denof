import { h } from 'vue'
import { renderToString } from 'vue/server-renderer'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const name = String(query.component || '')

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Missing component name' })
  }

  const {
    HeroBlock,
    ProductListBlock
  } = await import('#components')

  const registry: Record<string, any> = {
    hero: HeroBlock,
    productList: ProductListBlock
  }

  if (!registry[name]) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown component' })
  }

  let props: Record<string, any> = {}
  if (query.props) {
    try {
      props = JSON.parse(String(query.props))
    } catch (error) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid props JSON' })
    }
  }

  const Comp = registry[name]
  const vnode = h(Comp as any, props)
  const html = await renderToString(vnode)

  return html
})
