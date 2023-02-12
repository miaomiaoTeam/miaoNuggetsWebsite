export default defineEventHandler(event => {
  return {
    code: 0,
    message: 'OK',
    data: event.context.$userinfo,
  } as const
})
