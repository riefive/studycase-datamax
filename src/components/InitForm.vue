<template>   
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-switch v-model="isMockoon" class="ma-2" label="Switch to Mockoon Rest Api"></v-switch>
            </v-col>
            <v-col cols="6">
                <v-btn block id="dbloadbtn" color="success" class="mt-1 mb-2" @click="onLoad">
                    <v-icon class="mr-2">mdi-database-refresh</v-icon>
                    Import
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn block id="dbremovebtn" color="error" class="mt-1 mb-2" @click="onRemove">
                    <v-icon class="mr-2">mdi-database-remove</v-icon>
                    Clear
                </v-btn>
            </v-col>
        </v-row>
        <v-snackbar v-model="snackbar" :timeout="2500">
            {{ message }}
            <v-btn color="pink" text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import DummyUsers from '@/services/service.user'
import DummyProducts from '@/services/service.product'

export default {
    name: 'InitForm',
    data: () => ({
        apiName: 'dummy',
        isMockoon: false,
        snackbar: false,
        message: 'Import data is successfull.'
    }),
    props: {
        hasRoute: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        apiName (value) {
            if (value) {
                this.onRemove()
            }
        },
        snackbar (value) {
            if (value === false) {
                if (this.hasRoute) this.$router.push('/')
            }
        }
    },
    methods: {
        checkUrlOpen () {
            let urlTarget = this.$store.getters.getApiUrl
            if (this.$api) {
                this.$api(urlTarget, 1).get('/').then(response => {
                    if (response.status === 200) {
                        this.$store.dispatch('updateApiStatus', true)
                    }
                })
            }
        },
        changeApiName () {
            this.apiName = this.isMockoon ? 'mockoon' : 'dummy'
        },
        handleFaker (name, collection) {
            collection.forEach(element => {
                this.$store.dispatch('updateData', {key: name, action: 'post', data: element})
            })
        },
        handleRestResponse (name, response) {
            if (response.status !== 200) return false;
            if (Array.isArray(response.data)) {
                let collections = response.data
                collections.forEach(element => {
                    this.$store.dispatch('updateData', {key: name, action: 'post', data: element})
                })
            } 
        },
        onLoad () {
            this.changeApiName()
            this.$store.dispatch('updateApi', this.apiName)
            let stateUsers = this.$store.state.collections.users
            let stateProducts = this.$store.state.collections.products    
            if (this.apiName === 'dummy') {
                if (Array.isArray(stateUsers) && stateUsers.length === 0) {
                    this.handleFaker('users', DummyUsers)
                }
                if (Array.isArray(stateProducts) && stateProducts.length === 0) {
                    this.handleFaker('products', DummyProducts)
                }
            }
            else {
                let urlTarget = this.$store.getters.getApiUrl
                let apiIsReady = this.$store.state.apiIsReady
                if (! apiIsReady) {
                    this.isMockoon = false 
                    this.onLoad()
                    return false
                } 
                if (Array.isArray(stateUsers) && stateUsers.length === 0) {
                    this.$api(urlTarget).get('/users').then(response => {
                        this.handleRestResponse('users', response)
                    })
                } 
                if (Array.isArray(stateProducts) && stateProducts.length === 0) {
                    this.$api(urlTarget).get('/products').then(response => {
                        this.handleRestResponse('products', response)
                    })
                } 
            }
            this.snackbar = true
        },
        onRemove () {
            this.$store.dispatch('updateData', {key: 'users', action: 'clear'})
            this.$store.dispatch('updateData', {key: 'products', action: 'clear'})
        }
    },
    mounted () {
        this.checkUrlOpen()
    }
}
</script>