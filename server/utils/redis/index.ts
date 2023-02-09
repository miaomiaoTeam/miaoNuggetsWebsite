import { Redis } from 'ioredis'
import stringRandom from 'string-random'
import RedisConfig from 'server-config/redis'

export const access_redis = new Redis({
  ...RedisConfig,
  db: 0,
})

export const refresh_redis = new Redis({
  ...RedisConfig,
  db: 1,
})

export const createToken = async (redis: Redis, data: object, s: number) => {
  let value = stringRandom(32)
  while (await redis.exists(value)) value = stringRandom(32)
  const expired = Math.floor(Date.now() / 1000) + s
  await redis.hset(value, data)
  await redis.expireat(value, expired)
  return { value, expired } as Client.Token
}
