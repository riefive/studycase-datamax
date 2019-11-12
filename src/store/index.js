import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        currentUser: null,
        apiType: 'dummy', 
        apiProtocol: 'http',
        apiHost: 'localhost',
        apiPort: 3000,
        apiIsReady: false,
        activeModal: false,
        forms: {
            login: {email: '', password: ''},
            forgot: {email: ''}
        },
        collections: {
            users: [],
            products: [],
            reminders: []
        }
    },
    getters: {
        getApiUrl: state => {
            return `${state.apiProtocol}://${state.apiHost}:${state.apiPort}`
        },
        getCollectionByQuery: state => (name, options) => {
            let collections = state.collections
            if (! collections.hasOwnProperty(name)) return null
            let currentCollection = collections[name]
            let currentIndex = currentCollection.findIndex(item => {
                let found = false
                for (const key in options) {
                    const element = options[key]
                    if (item[key] !== element) found = false
                    else found = true
                }
                return found
            })
            return currentIndex > -1 ? currentCollection[currentIndex] : null
        }
    },
    mutations: {
        changeCollection (state, value) {
            let key = 'key' in value ? value.key : ''
            let action = 'action' in value ? value.action : 'post'
            let data = 'data' in value ? value.data : {}
            let collections = state.collections
            let foundIndexById = (collection, id) => {
                return collection.findIndex(item => (item._id === id))
            }
            if (key in collections) {
                let currentCollection = collections[key]
                let currentId = -1
                switch (action) {
                    case 'post':
                        currentId = foundIndexById(currentCollection, data._id)
                        if (currentId === -1) currentCollection.push(data)
                        break;
                    case 'put':
                        currentId = foundIndexById(currentCollection, data._id)
                        if (currentId > -1) currentCollection.splice(currentId, 1, data)
                        break;
                    case 'delete':
                        currentId = foundIndexById(currentCollection, data._id)
                        if (currentId > -1) currentCollection.splice(currentId, 1)
                        break;
                    case 'clear':
                        state.collections[key] = []
                        break;
                }
            }
        },
        changeApiType (state, value) {
            state.apiType = ['dummy', 'mockoon'].indexOf(value) > -1 ? value : 'dummy'
        },
        changeApiIsReady (state, value) {
            state.apiIsReady = value
        },
        changeCurrentUser (state, value) {
            state.currentUser = value
        },
        changeLogin (state, value) {
            state.isLogin = (value === true) ? true : false
        },
        changeActiveModal (state, value) {
            state.activeModal = value
        },
        changeInputForm (state, value) {
            let key = 'key' in value ? value.key : ''
            let data = 'data' in value ? value.data : {}
            let forms = state.forms
            if (key in forms) {
                state.forms[key] = data
            }
        }
    },
    actions: {
        updateApi ({ commit }, value) {
            commit('changeApiType', value)
        },
        updateApiStatus ( { commit }, value) {
            commit('changeApiIsReady', value)
        },
        updateData ({ commit }, value) {
            commit('changeCollection', value)
        },
        updateCurrentUser ({ commit }, value) {
            commit('changeCurrentUser', value)
        },
        updateLogin ({ commit }, value) {
            commit('changeLogin', value)
        },
        updateActiveModal ({ commit }, value) {
            commit('changeActiveModal', value)
        },
        updateInputForm ({ commit }, value) {
            commit('changeInputForm', value)
        }
    },
    modules: {

    }
})
