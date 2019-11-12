<template>
    <div class="mx-2 mt-1 mb-5">
        <v-expansion-panels 
            v-model="panels"
            multiple
        >
            <v-expansion-panel>
                <v-expansion-panel-header class="text-uppercase">Route Page</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col 
                            v-for="item in buttons"
                            :key="`${item.id}-btn`"
                            cols="3"
                        >
                        <v-btn block color="yellow darken-2" @click="onRoute">
                            <v-icon class="mr-2">{{ item.icon }}</v-icon>
                            {{ item.title }}
                        </v-btn>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header class="text-uppercase">User List</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <card-show-user-list :list="userList"></card-show-user-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header class="text-uppercase">Product List</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <card-show-product-list :list="productList"></card-show-product-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data: () => ({
        panels: [0, 1, 2],
        buttons: [
            {id: 'dashboard', title: 'Dashboard', link: '/', icon: 'mdi-apps'},
            {id: 'user', title: 'User', link: '/users', icon: 'mdi-account-group'},
            {id: 'product', title: 'Product', link: '/products', icon: 'mdi-clipboard-text'},
        ]
    }),
    components: {
        CardShowProductList: () => import ('@/components/CardShowProductList'),
        CardShowUserList: () => import ('@/components/CardShowUserList')
    },
    computed: {
        userList () {
            let list = this.$store.state.collections.users
            return list.slice(0, 5)
        },
        productList () {
            let list = this.$store.state.collections.products
            return list.slice(0, 5)
        }
    },
    methods: {
        onRoute () {
            let element = null
            let target = event.target ? event.target : event.srcElement
            if (target.tagName === 'SPAN') element = target
            else if (target.tagName === 'I') element = target.offsetParent
            let buttons = this.buttons
            if (! element) return null
            let index = buttons.findIndex(item => (item.id === String(element.innerText).toLowerCase()))
            if (index > -1) {
                this.$router.push(buttons[index].link)
            }
        }
    }
}
</script>
