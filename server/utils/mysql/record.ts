import fs from 'fs'
import path from 'path'
import url from 'url'
import { MysqlError } from 'mysql'
import { table } from 'table'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const record = (log: string, data?: any) => {
  if (!fs.existsSync(path.join(__dirname, 'log', 'mysql')))
    fs.mkdirSync(path.join(__dirname, 'log', 'mysql'), { recursive: true })
  fs.writeFileSync(
    path.join(__dirname, 'log', 'mysql', getNowDate() + '.log'),
    `[${getNowDate()} ${getNowTime()}] ${log}${
      data ? `\n${formatObject(data)}` : ''
    } \n\n`,
    { encoding: 'utf8', flag: 'a' }
  )
}
export const recordError = (err: MysqlError) =>
  record(
    '\n-\t' +
      Object.entries(err)
        .map(([key, val]) => key + ': ' + val)
        .join('\n-\t')
  )

export const getNowDate = () => {
  const date = new Date()
  const year = date.getFullYear() + ''
  const month = date.getMonth() + 1 + ''
  const day = date.getDate() + ''
  return year + month.padStart(2, '0') + day.padStart(2, '0')
}
export const getNowTime = () => {
  const date = new Date()
  const hours = date.getHours() + ''
  const minutes = date.getMinutes() + ''
  const seconds = date.getSeconds() + ''
  return `${hours.padStart(2, '0')}:${minutes.padStart(
    2,
    '0'
  )}:${seconds.padStart(2, '0')}`
}

const singleTableConfig = {
  border: {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,

    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight: `┘`,

    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,

    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`,
  },
}
export const formatObject = (
  datas: string | MaybeArray<Record<string, unknown>>
) => {
  if (typeof datas === 'string') return String(datas)
  else if (Array.isArray(datas)) {
    const map = new Map<string, unknown[]>()
    for (const item of datas) {
      for (const [key, val] of Object.entries(item)) {
        const vals = map.get(key)
        if (vals) vals.push(val)
        else map.set(key, [val])
      }
    }
    const data = [[]] as string[][]
    for (const [key, vals] of map) {
      data[0].push(key)
      for (let i = 0; i < vals.length; i++) {
        const val = vals[i]
        if (!data[i + 1]) data[i + 1] = []
        data[i + 1].push(
          ['string', 'number', 'boolean'].includes(typeof val)
            ? String(val)
            : Object.prototype.toString.call(val)
        )
      }
    }
    return table(data, singleTableConfig)
  }
}
