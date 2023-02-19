export const recordTimeCount = (records: DB.RecordTime) => {
  let count = 0
  for (const key in records) {
    if (Object.prototype.hasOwnProperty.call(records, key)) {
      count++
    }
  }
  return count
}
