import { query, useTransaction } from 'server-utils/mysql'

describe('query', () => {
  test('empty', async () => {
    await query<{}>('select * from empty_list').catch(err =>
      expect(err.sqlMessage).toMatch("doesn't exist")
    )
  })
})

describe('transaction', () => {
  test('empty', async () => {
    const transaction = useTransaction()
    await transaction.begin()
    await transaction
      .query('select * from empty_list')
      .catch(err => expect(err.sqlMessage).toMatch("doesn't exist"))
    transaction.release()
  })
})
