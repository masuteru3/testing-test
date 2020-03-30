import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  describe('calculate', () => {
    it('[plus]submit and result(default mode)', () => {
      const wrapper = shallowMount(Home)
      wrapper.setData({ num1: 3, num2: 5 })
      wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.result).toBe(8)
    })
    it('[minus]submit and result', () => {
      const wrapper = shallowMount(Home)
      wrapper.setData({ mode: 'minus', num1: 5, num2: 7.3 })
      wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.result).toBe(-2.3)
    })
    it('[times]submit and result', () => {
      const wrapper = shallowMount(Home)
      wrapper.setData({ mode: 'times', num1: 2.2, num2: 3 })
      wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.result).toBe(6.6)
    })
    it('[divide]submit and result', () => {
      const wrapper = shallowMount(Home)
      wrapper.setData({ mode: 'divide', num1: 100, num2: 3 })
      wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.result).toBe(33.33)
    })
  })

  describe('feedback and result', () => {
    it('submit and feedback as error', () => {
      const wrapper = shallowMount(Home)
      wrapper.setData({ num1: 0, num2: 0 })
      wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.feedback).toBeTruthy()
    })
  })

  describe('resetButton', () => {
    it('clear all value when resetAll methods', () => {
      const wrapper = shallowMount(Home)
      wrapper.setData({ num1: 3, num2: 5 })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.find('#reset').trigger('click.prevent')
      expect(wrapper.vm.mode).toBe('plus')
      expect(wrapper.vm.num1).toBe(null)
      expect(wrapper.vm.num2).toBe(null)
      expect(wrapper.vm.result).toBe(null)
      expect(wrapper.vm.history).not.toStrictEqual([])
    })
  })
})
