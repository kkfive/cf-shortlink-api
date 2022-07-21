import { KvHelper } from '../utils/kv'
import { randomString, redirect, returnRes } from '../utils/common'
export async function addUrl(url: string, kv: KvHelper): Promise<Response> {
  const random_key = randomString()
  const flag = await kv.check(random_key)

  if (flag) {
    return addUrl(url, kv)
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
