import { h } from 'vue'
import { renderToString } from 'vue/server-renderer'

type Block = {
  type: string
  props?: Record<string, any>
}

type Payload = {
  menu?: Array<{ label: string; url: string }>
  user?: { name?: string | null }
  blocks: Block[]
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ payload: Payload }>(event)

  if (!body?.payload) {
    throw createError({ statusCode: 400, statusMessage: 'Missing payload' })
  }

  const { PageBridge } = await import('#components')

  const vnode = h(PageBridge as any, body.payload)
  const html = await renderToString(vnode)

  return { html }
})
