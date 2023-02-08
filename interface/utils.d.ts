type MaybePromise<T> = T | Promise<T>
type MaybeArray<T> = T | Array<T>

/** 由时间转换为的字符串，可直接用于构建Date对象 */
type DateString = string
