import { shallowMount } from '@vue/test-utils'

import { ElButton } from 'element-plus'

describe('这只是一个测试', () => {
  it.todo('汪汪汪汪')

  test('ElButton', () => {
    const button = shallowMount(ElButton, { slots: { default: 'Button' } })
    console.log(button)

    expect(button.text()).toBe('Button')
  })
})
