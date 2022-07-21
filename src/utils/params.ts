/**
 * 获取请求参数
 */

export async function getRequestInfo(
  request: Request
): Promise<{ params: Record<string, string>; path: string }> {
  const params: {
    [key: string]: string
  } = {}

  const url = new URL(request.url)
  // 获取请求参数
  if (request.method.toUpperCase() === 'GET') {
    const searchParams = url.searchParams
    for (const [key, value] of searchParams) {
      params[key] = value
    }
  } else if (request.method.toUpperCase() === 'POST') {
    const body = ((await request.json()) as {}) || {}

    for (const [key, value] of Object.entries(body)) {
      params[key] = value as any
    }
  }
  // 获取请求路径
  const path = url.pathname.startsWith('/')
    ? url.pathname.slice(1)
    : url.pathname

  return { params, path }
}
