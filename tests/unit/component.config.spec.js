import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import store from '@/store'
import InitForm from '@/components/InitForm.vue'

Vue.use(Vuex)
Vue.use(Vuetify)
const localVue = createLocalVue()

describe ('Test Component of InitForm.vue', () => {
    let vuetify, wrapper

    before (() => {
        vuetify = new Vuetify()
        wrapper = mount(InitForm, {
            localVue,
            store,
            vuetify,
            propsData: {hasRoute: false}
        })
    })

    it ('Render Init', () => {
        let text = wrapper.text()
        expect(text).to.contain('Import')
        expect(text).to.contain('Clear')
    })

    it ('Click Import', () => {
        let button = wrapper.find('button#dbloadbtn')
        button.trigger('click')

        let users = store.state.collections.users
        let products = store.state.collections.products
        expect(users.length).to.greaterThan(0)
        expect(products.length).to.greaterThan(0)
    })

    it ('Click Clear', () => {
        let button = wrapper.find('button#dbremovebtn')
        button.trigger('click')

        let users = store.state.collections.users
        let products = store.state.collections.products
        expect(users.length).to.eq(0)
        expect(products.length).to.eq(0)
    })

    it ('Notification Check', () => {
        let button = wrapper.find('button#dbloadbtn')
        button.trigger('click')
        let snackbar = wrapper.find('div.v-snack')
        expect(snackbar.text()).to.contain('Import data is successfull')
    })
})