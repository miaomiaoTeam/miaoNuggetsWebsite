import { ElButton } from 'element-plus'
import { shallowMount } from '@vue/test-utils'

describe('这只是一个测试', () => {
  it.todo('汪汪汪汪')

  test('ElButton', () => {
    const button = shallowMount(
      defineComponent(() => () => h(ElButton, { default: 666 }))
    )
    expect(button.text()).toBe('666')
  })
})
