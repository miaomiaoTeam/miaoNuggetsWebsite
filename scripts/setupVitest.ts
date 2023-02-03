import fs from 'fs'
import path from 'path'

if (!('MYSQL_HOST' in process.env)) {
  const env = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf-8')
  for (const line of env.split('\r\n')) {
    if (line && line.includes('=')) {
      const [key, val] = line.split('=')
      process.env[key] = val
    }
  }
}
