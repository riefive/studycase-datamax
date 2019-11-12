<template>
    <component :is="layout">
        <router-view></router-view>
    </component>
</template>

<script>
const defaultLayoutName = 'default'
export default {
    name: 'App',
    data: () => ({

    }),
    computed: {
        layout () {
            return (this.$route.meta.layout || defaultLayoutName) + '-layout'
        }
    }
}
</script>
