declare module '*?url' {
  const file: string
  export default file
}

declare module '*?raw' {
  const file: string
  export default file
}

declare module '*?worker' {
  const file: Worker
  export default file
}
declare module '*?sharedworker' {
  const file: SharedWorker
  export default file
}
declare module '*?worker&inline' {
  const file: string
  export default file
}
