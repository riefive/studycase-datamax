<template>
    <v-app>
        <v-content>
            <slot></slot>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    methods: {
        checkReady () {
            let pathName = this.$route.path
            if (pathName === '/config') return false 
            
            let users = this.$store.state.collections.users
            let products = this.$store.state.collections.products
            
            if (users.length === 0 && products.length === 0) {
                this.$router.push('/config')
            }
        }
    },
    mounted () {
        this.checkReady()
    }
}
</script>