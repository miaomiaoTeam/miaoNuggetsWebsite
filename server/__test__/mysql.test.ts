import { mysql } from 'server-utils/mysql'

describe('mysql connect', () => {
	test('test', () => {
		expect(mysql()).toBe('mysql')
	})
})
