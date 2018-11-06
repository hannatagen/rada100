import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/Hello.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'See the sources here:  github.com/jonashackt/spring-boot-vuejs This site contains more stuff :) HowTo call REST-Services: /callservice HowTo to play around with Bootstrap UI components: /bootstrap HowTo to interact with the Spring Boot database backend: /user'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
