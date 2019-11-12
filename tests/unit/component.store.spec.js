import { expect } from 'chai'
import api from '@/plugins/api'
import store from '@/store'
import DummyUsers from '@/services/service.user'
import DummyProducts from '@/services/service.product'

describe ('Test Store Getters', () => {
    let urlTarget
    const userQuery = {email: 'demo@sample.com', password: 'Demo@123456'}

    beforeEach (() => {
        urlTarget = store.getters.getApiUrl
        store.dispatch('updateData', {key: 'users', action: 'clear'})
        store.dispatch('updateData', {key: 'products', action: 'clear'})
    })

    it ('Users Dummy Search', () => {
        DummyUsers.forEach(element => {
            store.dispatch('updateData', {key: 'users', action: 'post', data: element})
        })
        
        let users = store.state.collections.users
        let userItem = store.getters.getCollectionByQuery('users', userQuery)

        expect(users.length).to.greaterThan(0)
        expect(userItem).to.not.null
        expect(userItem.email).to.equal(userQuery.email)
    })

    it ('Users Mockoon Search', (done) => {
        api(urlTarget).get('/users').then(response => {
            if (response.status === 200) {
                let data = response.data
                data.forEach(element => {
                    store.dispatch('updateData', {key: 'users', action: 'post', data: element})
                })
            }

            let users = store.state.collections.users
            let userItem = store.getters.getCollectionByQuery('users', userQuery)
            expect(users.length).to.equal(25)
            expect(userItem).to.not.null
            expect(userItem.email).to.equal(userQuery.email)
            done()
        })
    })

    it ('Products Dummy Length', () => {
        DummyProducts.forEach(element => {
            store.dispatch('updateData', {key: 'products', action: 'post', data: element})
        })
        
        let products = store.state.collections.products
        expect(products.length).to.greaterThan(0)
    })

    it ('Products Mockoon Length', (done) => {
        api(urlTarget).get('/products').then(response => {
            if (response.status === 200) {
                let data = response.data
                data.forEach(element => {
                    store.dispatch('updateData', {key: 'products', action: 'post', data: element})
                })
            }

            let products = store.state.collections.products
            expect(products.length).to.equal(25)
            done()
        })
    })
})