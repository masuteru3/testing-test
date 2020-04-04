import { shallowMount } from '@vue/test-utils'
import History from '@/components/History.vue'

describe('History', () => {
  it('must input result', () => {
    const wrapper = shallowMount(History, {
      propsData: {
        histories: [
          {
            mode: 'plus',
            num1: 3,
            num2: 8,
            result: 11
          }
        ]
      }
    })
    const result = wrapper.find('#result')
    expect(result.text()).toBe('11')
  })
})
