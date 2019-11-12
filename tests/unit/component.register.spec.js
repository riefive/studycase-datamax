import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import store from '@/store'
import RegisterForm from '@/components/RegisterForm.vue'

Vue.use(Vuex)
Vue.use(Vuetify)
const localVue = createLocalVue()

describe ('Test Component of RegisterForm.vue', () => {
    let vuetify, wrapper

    before (() => {
        vuetify = new Vuetify()
        wrapper = mount(RegisterForm, {
            localVue,
            store,
            vuetify
        })
    })

    it ('Render Register', () => {
        let text = wrapper.text()
        expect(text).to.contain('Username')
        expect(text).to.contain('E-mail')
        expect(text).to.contain('Date of Birth')
        expect(text).to.contain('Register')
    })
})