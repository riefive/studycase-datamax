import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import store from '@/store'
import DialogExit from '@/components/DialogExit.vue'

Vue.use(Vuex)
Vue.use(Vuetify)
const localVue = createLocalVue()
        
describe ('Test Component of DialogExit.vue', () => {
    let vuetify, wrapper

    beforeEach (() => {
        localVue.use(Vuetify)
        const App = localVue.component('App', {
            components: { DialogExit },
            props: ['show'],
            template: `
              <div data-app>
                <DialogExit :dialog="show"/>
              </div>
            `
        })
        vuetify = new Vuetify()
        wrapper = mount(App, {
            attachToDocument: true,
            localVue,
            store,
            vuetify,
            propsData: {
                show: true
            }
        })
    })

    it ('Render Logout Dialog', () => {
        let html = wrapper.html()
        expect(html).to.contain('Logout')
        expect(html).to.contain('No')
        expect(html).to.contain('Yes')
    })
})