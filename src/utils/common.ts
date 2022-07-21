/**
 * 生成随机字符串
 * @param length 长度
 * @returns
 */
export function randomString(length: number = 6): string {
  let $chars =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length
  let result = ''
  for (let i = 0; i < length; i++) {
    result += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return result
}
export async function sha512(url: string): Promise<string> {
  const urlBuffer = new TextEncoder().encode(url)

  const url_digest = await crypto.subtle.digest(
    {
      name: 'SHA-512'
    },
    urlBuffer // The data you want to hash as an ArrayBuffer
  )
  const hashArray = Array.from(new Uint8Array(url_digest)) // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}
export function checkURL(URL: string) {
  let str = URL
  let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
  let objExp = new RegExp(Expression)
  if (objExp.test(str) == true) {
    if (str[0] == 'h') return true
    else return false
  } else {
    return false
  }
}

/**
 * 重定向函数
 * @param url 重定向的url
 * @param status 重定向的状态码 默认302
 */
export function redirect(url: string, status = 302) {
  return Response.redirect(url, status)
}

export function returnRes(data: any) {
  return Response.json(data)
}
