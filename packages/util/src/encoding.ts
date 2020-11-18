import * as urls from './urls'

export function toBase64 (str: string, encoding = 'utf8' as 'utf8') {
  const res = urls.escape(Buffer.from(str, encoding).toString('base64'))
  return res
}

export function fromBase64 (str: string, encoding = 'utf8' as 'utf8') {
  const res = Buffer.from(urls.unescape(str), 'base64').toString(encoding)
  return res
}