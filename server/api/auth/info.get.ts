export default defineEventHandler(event => {
  return {
    code: 0,
    message: 'OK',
    data: event.context.$admininfo || event.context.$userinfo,
  } as const
})
