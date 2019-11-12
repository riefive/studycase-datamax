import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import store from '@/store'
import ForgotForm from '@/components/ForgotForm.vue'

Vue.use(Vuex)
Vue.use(Vuetify)
const localVue = createLocalVue()

describe ('Test Component of ForgotForm.vue', () => {
    let vuetify, wrapper

    before (() => {
        vuetify = new Vuetify()
        wrapper = mount(ForgotForm, {
            localVue,
            store,
            vuetify
        })
    })

    it ('Render Forgot', () => {
        let text = wrapper.text()
        expect(text).to.contain('E-mail')
        expect(text).to.contain('Reset Password')
    })

    it ('Click Forgot', () => {
        let emailTextField = wrapper.find('input[name="email"]')
        let button = wrapper.find('button#forgotbtn')

        if (emailTextField) {
            emailTextField.element.value = 'demo@example.com'
        }
        
        button.trigger('click')
        expect(emailTextField.element.value).to.equal(store.state.forms.forgot.email)
    })
})