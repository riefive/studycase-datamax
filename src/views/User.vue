<template>
    <table-list-user></table-list-user>
</template>

<script>
export default {
    name: 'User',
    components: {
        TableListUser: () => import ('@/components/TableListUser')
    }
}
</script>
