<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
        >
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            color="primary"
            :clipped-left="clipped"
            fixed
            dark
            app
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
            <v-btn icon @click.stop="clipped = !clipped">
                <v-icon>mdi-application</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title" class="text-uppercase" />
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn text @click="$router.push('/logout')">
                    <v-icon class="mr-2">mdi-account</v-icon>
                    {{ currentUserName }}
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-content>
            <slot></slot>
        </v-content>
        <v-footer fixed app>
            <span class="caption text--primary mr-1">{{ currentCreator }}</span>
            <v-spacer></v-spacer>
            <span class="caption text--primary">&copy; {{ currentYear }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'AdminLayout',
    data: () => ({
        clipped: true,
        drawer: true,
        fixed: true,
        miniVariant: false,
        currentLogin: false,
        title: 'Restricted Area',
        items: [
            {
                icon: 'mdi-apps',
                title: 'Dashboard',
                to: '/'
            },
            {
                icon: 'mdi-account-group',
                title: 'User',
                to: '/users'
            },
            {
                icon: 'mdi-clipboard-text',
                title: 'Product',
                to: '/products'
            },
            {
                icon: 'mdi-account-lock',
                title: 'Reset Password',
                to: '/reset'
            },
            {
                icon: 'mdi-logout',
                title: 'Logout',
                to: '/logout'
            }
      ],
    }),
    computed: {
        currentUserName () {
            let currentUser = this.$store.state.currentUser
            return currentUser ? `${currentUser.username}` : 'Unknow'
        },
        currentCreator () {
            return `Created by Riefive | rie.five@gmail.com`
        },
        currentYear () {
            return new Date().getFullYear()
        }
    },
    methods: {
        watchLogin () {
            this.$store.watch(
                (state) => {
                    return state.isLogin
                },
                (value) => {
                    this.currentLogin = value
                },
                { deep: true }
            )
            let isLogin = this.$store.state.isLogin
            if (! isLogin) {
                this.$router.push('/login')
            }
        }
    },
    beforeMount () {
        this.watchLogin()
    }
}
</script>