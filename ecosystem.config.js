module.exports = {
  apps: [
    {
      name: 'miao-nuggets',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
