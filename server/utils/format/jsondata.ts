export function jsonToData(json: Record<string, unknown>) {
  const data: Record<string, string | number | boolean> = {}
  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
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
