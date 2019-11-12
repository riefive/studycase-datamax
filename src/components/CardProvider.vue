<script>
export default {
    name: 'CardProvider',
    provide: {
        text: {
            show: true,
            parent: 'My Parent Text'
        }
    },
    render () {
        return this.$slots.default[0];
    }
}
</script>