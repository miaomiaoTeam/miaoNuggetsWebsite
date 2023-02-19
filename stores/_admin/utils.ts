type State<Data extends DB.WriteAble> = {
  list: Data[]
  map: Map<Data['id'], Data>
  raw: Data[]
  update_time?: DateString
}

export function increase<Data extends DB.WriteAble>(
  state: State<Data>,
  data: Data,
  init = false
) {
  init || state.raw.push(data)
  state.list.push(data)
  state.map.set(data.id, data)
}

export function remove<Data extends DB.WriteAble>(
  state: State<Data>,
  id: MaybeArray<Data['id']>,
  init = false
) {
  const id_set = new Set(Array.isArray(id) ? id : [id])
  for (let index = 0; index < state.list.length; index++) {
    const { id } = state.list[index]
    if (id_set.has(id)) {
      state.list.splice(index, 1)
      init || state.raw.splice(index, 1)
      index--
      id_set.delete(id)
      state.map.delete(id)
    }
  }
}

export function refresh<Data extends DB.WriteAble>(
  state: State<Data>,
  datas?: Data[]
) {
  datas && (state.raw = datas)
  state.list.length = 0
  state.map.clear()
  for (const data of datas ?? state.raw) {
    increase(state, data, true)
  }
  datas && update(state)
  return state.raw
}

export function update<Data extends DB.WriteAble>(state: State<Data>) {
  const time = new Date()
  const years = String(time.getFullYear())
  const months = String(time.getMonth() + 1).padStart(2, '0')
  const days = String(time.getDate()).padStart(2, '0')
  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  const seconds = String(time.getSeconds()).padStart(2, '0')
  state.update_time = `${years}/${months}/${days} ${hours}:${minutes}:${seconds}`
}
