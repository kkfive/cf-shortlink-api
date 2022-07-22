import { KvHelper } from '../utils/kv'
import { randomString, redirect, returnRes } from '../utils/common'
export async function addUrl(
  url: string,
  len: number,
  kv: KvHelper
): Promise<Response> {
  const random_key = randomString(len || 6)
  const flag = await kv.check(random_key)

  if (flag) {
    return addUrl(url, len, kv)
  } else {
    const result = await kv.save(random_key, url)

    if (result) {
      return returnRes({ code: 200, msg: 'success', data: random_key })
    } else {
      return returnRes({ code: 0, msg: 'error', data: null })
    }
  }
}

export async function getUrl(key: string, kv: KvHelper) {
  const flag = await kv.get(key)
  if (flag) {
    return redirect(flag)
  }
  return returnRes({ code: 0, msg: 'error', data: null })
}

export async function deleteUrl(key: string, kv: KvHelper) {
  const flag = await kv.remove(key)
  if (flag) {
    return returnRes({ code: 200, msg: 'success', data: null })
  }
  return returnRes({ code: 0, msg: 'error', data: null })
}
export async function listUrl(
  kv: KvHelper,
  limit = 10,
  cursor: string | null = null
) {
  try {
    limit = Number(limit)
  } catch (e) {}
  const kvNamespaceListResult = await kv.list(limit, cursor)
  const list: any[] = []
  for await (let item of kvNamespaceListResult.keys) {
    const key = item.name
    const value = await kv.get(key)
    list.push({ key, value })
  }
  return returnRes({
    code: 200,
    msg: 'success',
    data: { list, cursor }
  })
}
export async function editUrl(url: string, key: string, kv: KvHelper) {
  const flag = await kv.check(key)
  if (flag) {
    const flag = await kv.save(key, url)
    if (flag) {
      return returnRes({ code: 200, msg: 'success', data: null })
    } else {
      return returnRes({ code: 0, msg: '添加失败', data: null })
    }
  } else {
    return returnRes({ code: 0, msg: '没有找到这个key', data: null })
  }
}
