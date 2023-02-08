import { access_redis } from 'server-utils/redis'

describe('redis', async () => {
  await access_redis.hset('__test__', { a: 1, b: '2' })
  const a = await access_redis.hget('__test__', 'a')
  const b = await access_redis.hget('__test__', 'b')
  test('connect', () => {
    expect(a).toBe('1')
    expect(b).toBe('2')
  })
  await access_redis.del('__test__')
})
