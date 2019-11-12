<template>
    <table-list-product></table-list-product>
</template>

<script>
export default {
    name: 'Product',
    components: {
        TableListProduct: () => import ('@/components/TableListProduct')
    }
}
</script>
