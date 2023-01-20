// import { ElButton } from 'element-plus'
import { describe, test } from 'vitest'
import { setup } from '@nuxt/test-utils'
describe('My test', async () => {
  await setup({
    // test context options
  })
  test('my test', () => {
    // ...
  })
})

// describe('这只是一个测试', () => {
//   it.todo('汪汪汪汪')

//   test('ElButton', () => {
//     const button = shallowMount(ElButton, { slots: { default: 'Button' } })
//     console.log(button)

//     expect(button.text()).toBe('Button')
//   })
// })
