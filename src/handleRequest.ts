import { addUrl, deleteUrl, getUrl } from './handler/api'
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
  if (params.password === env.PASSWORD) {
    // 密码密文不正确
    return Response.redirect('')
  }
  const kv = new KvHelper(env.LINKS)
  if (method === 'POST') {
    let response: Response = returnRes({ code: 0, msg: 'error', data: null })

    // 添加链接
    if (params.type === 'add') {
      console.log(params.type)
      response = await addUrl(params.url, kv)
    } else if (params.type === 'delete') {
      response = await deleteUrl(params.key, kv)
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
