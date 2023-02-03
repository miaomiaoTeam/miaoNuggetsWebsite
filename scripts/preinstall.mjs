if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001B[33m此项目需要使用pnpm作为包管理器，脚本才能正常工作。\u001B[39m\n`
  )
  process.exit(1)
}
