<template>
    <div>
        <dialog-exit :dialog="true" v-model="isLogout"></dialog-exit>
    </div>
</template>

<script>
export default {
    name: 'Logout',
    data: () => ({
        isLogout: false
    }),
    components: {
        DialogExit: () => import ('@/components/DialogExit')
    },
    watch: {
        isLogout (value) {
            if (value === true) {
                this.$store.dispatch('updateLogin', false)
                this.$store.dispatch('updateCurrentUser', {})
                setTimeout(() => {
                    this.$router.push('/config')
                }, 1500)
            }
        }
    }
}
</script>
