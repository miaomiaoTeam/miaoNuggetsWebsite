export function jsonToData(json: DB.Base) {
  const data: Record<string, string | number | boolean> = {}
  for (const _key in json) {
    if (Object.prototype.hasOwnProperty.call(json, _key)) {
      const key = _key as keyof typeof json
      const val = json[key]
      switch (typeof val) {
        case 'string':
        case 'number':
        case 'boolean':
          data[key] = val
          break
        case 'object':
          if (val) data[key] = JSON.stringify(val)
          break
      }
    }
  }
  return data
}
