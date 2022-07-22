import { addUrl, deleteUrl, getUrl, listUrl, editUrl } from './handler/api'
import { Env } from './types/env'
import { returnRes } from './utils/common'
import { KvHelper } from './utils/kv'
import { getRequestInfo } from './utils/params'

export async function handleRequest(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  const { params, path } = await getRequestInfo(request)
  const method = request.method.toUpperCase()

  const kv = new KvHelper(env.LINKS)

  if (method === 'POST') {
    if (params.password !== env.PASSWORD) {
      // 密码密文不正确
      return returnRes({ code: 0, msg: '密文不正确', data: null })
    }
    let response: Response = returnRes({ code: 0, msg: 'error', data: null })
    // 添加链接
    if (params.type === 'add') {
      let len = params.length || 6
      try {
        len = Number(len)
      } catch (e) {
        len = 6
      }
      len = Math.max(len, 6)
      response = await addUrl(params.url, len, kv)
    } else if (params.type === 'delete') {
      response = await deleteUrl(params.key, kv)
    } else if (params.type === 'list') {
      let limit = 10
      try {
        limit = Number(params.limit)
      } catch (e) {}
      response = await listUrl(kv, limit, params.cursor)
    } else if (params.type === 'update') {
      const key = params.key
      response = await editUrl(params.url, key, kv)
    }
    return response
    // API请求
  } else if (method === 'GET') {
    if (!path) {
      console.log('首页处理')
      return returnRes({ code: 200, msg: 'success', data: '新服务正在重构' })
    } else {
      return await getUrl(path, kv)
    }
  }

  const html = `
  服务正在重构，敬请期待！
  `

  return new Response(html)
}
