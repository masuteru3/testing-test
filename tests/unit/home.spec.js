import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('has title with h1 tag', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.contains('h1')).toBe(true)
  })

  it('submit and result(default: plus)', () => {
    const wrapper = shallowMount(Home)
    wrapper.setData({num1: 3, num2: 5})
    wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.result).toBe(8)
  })

  it('submit and feedback as error', () => {
    const wrapper = shallowMount(Home)
    wrapper.setData({num1: 0, num2: 0})
    wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.feedback).toBeTruthy()
  })

  it('clear all value when resetAll methods', () => {
    const wrapper = shallowMount(Home)
    wrapper.setData({num1: 3, num2: 5})
    wrapper.find('form').trigger('submit.prevent')
    wrapper.find('#reset').trigger('click.prevent')
    expect(wrapper.vm.mode).toBe('plus')
    expect(wrapper.vm.num1).toBe(null)
    expect(wrapper.vm.num2).toBe(null)
    expect(wrapper.vm.result).toBe(null)
    expect(wrapper.vm.history).not.toStrictEqual([])
  })
})