import { Redis } from 'ioredis'
import stringRandom from 'string-random'

export const access_redis = new Redis({
  host: 'r-bp1igthvh7undn13cmpd.redis.rds.aliyuncs.com',
  port: 6379,
  username: 'miao_nuggets',
  password: 'Miao202302',
  db: 0,
})

export const refresh_redis = new Redis({
  host: 'r-bp1igthvh7undn13cmpd.redis.rds.aliyuncs.com',
  port: 6379,
  username: 'miao_nuggets',
  password: 'Miao202302',
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
