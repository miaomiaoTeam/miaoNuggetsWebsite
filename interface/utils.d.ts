// 统合类型
type MaybePromise<T> = T | Promise<T>
type MaybeArray<T> = T | Array<T>

// 补充类型
/** 由时间转换为的字符串，可直接用于构建Date对象 */
type DateString = string

// 提取类型
type getVal<T extends object> = [T] extends [null] ? never : T[keyof T]
type getSet<T> = T extends Set<infer V> ? V : T
type getMap<T> = T extends Map<infer K, infer V> ? [K, V] : T
type getBoolKey<T extends Record<unknown, unknown>> = keyof {
  [Key in keyof T as T[Key] extends boolean ? Key : never]: unknown
}
type getJsonKey<T extends Record<unknown, unknown>> = keyof {
  [Key in keyof T as T[Key] extends Record<string, unknown> | Array<unknown>
    ? Key
    : never]: unknown
}

type exp = getJsonKey<DB.UserList>

// 工具类型
type PickRecord<
  T extends Record<string, unknown>,
  P extends keyof T = never,
  R extends Exclude<keyof T, P> = never
> = {
  [K in P]?: T[K]
} & {
  [K in R]-?: T[K]
}
