import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import store from '@/store'
import router from '@/router'
import LoginForm from '@/components/LoginForm.vue'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuetify)
const localVue = createLocalVue()
global.requestAnimationFrame = cb => cb()

describe ('Test Component of LoginForm.vue', () => {
    let vuetify, wrapper

    before (() => {
        vuetify = new Vuetify()
        wrapper = mount(LoginForm, {
            localVue,
            store,
            router,
            vuetify,
            propsData: {
                displayAlert: true,
                displayText: 'Info login is success.'
            },
            stubs: ['router-link', 'router-view']
        })
    })

    it ('Render Login', () => {
        let text = wrapper.text()
        expect(text).to.contain('E-mail')
        expect(text).to.contain('Password')
        expect(text).to.contain('Login')
    })

    it ('Click Login', () => {
        let emailTextField = wrapper.find('input[name="email"]')
        let passwordTextField = wrapper.find('input[name="password"]')
        let button = wrapper.find('button#loginbtn')

        if (emailTextField) {
            emailTextField.element.value = 'demo@example.com'
        }
        if (emailTextField) {
            passwordTextField.element.value = 'tester'
        }

        button.trigger('click')
        expect(emailTextField.element.value).to.equal(store.state.forms.login.email)
        expect(passwordTextField.element.value).to.equal(store.state.forms.login.password)
    })

    it ('Route to Register', () => {
        let link = wrapper.find('#linkRegister')
        link.trigger('click')
        expect(wrapper.vm.$route.path).to.equal('/')
    })

    it ('Notification Check', () => {
        let notif = wrapper.find('#notification')
        expect(notif.text()).to.contain('Info login is success.')
    })
})