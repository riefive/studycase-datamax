<script>
import TableList from '@/components/TableList'
export default {
    name: 'TableListProduct',
    extends: TableList,
    data: () => ({
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Title', value: 'title' },
            { text: 'Image', value: 'image' },
            { text: 'Color', value: 'color', align: 'center' },
            { text: 'Quantity', value: 'quantity', align: 'center' },
            { text: 'Enabled', value: 'enabled', align: 'center' },
            { text: 'Actions', value: 'action', sortable: false },
            { text: '', value: 'data-table-expand' }
        ],
        anothers: ['description'],
        button: {icon: 'mdi-plus-box', name: 'Add Product'},
        table: 'products',
        primary: '_id'
    }),
    components: {
        ModalForm: () => import ('@/components/ProductForm')
    },
    computed: {
        collections () {
            let currentCollections = this.$store.state.collections.products
            return currentCollections
        }
    },
    methods: {
        onActionItem (type, value) {
            let action = type
            let apiType = this.$store.state.apiType
            if (apiType === 'dummy') {
                if (value._id === '') {
                    value._id = String(Math.ceil(Math.random() * Math.pow(10, 6))).padStart(10, '0')
                }
                this.$store.dispatch('updateData', {key: this.table, action, data: value})
            }
            else {
                let urlTarget = this.$store.getters.getApiUrl
                let apiIsReady = this.$store.state.apiIsReady
                if (! apiIsReady) return false
                if (action === 'post') {
                    this.$api(urlTarget).post('/product', value).then(response => {
                        if (response.status === 200) {
                            this.$store.dispatch('updateData', {key: this.table, action, data: response.data})
                        }
                    })
                }
                if (action === 'put') {
                    this.$api(urlTarget).put('/product/' + value._id, value).then(response => {
                        if (response.status === 200) {
                            this.$store.dispatch('updateData', {key: this.table, action, data: response.data})
                        }
                    })
                }
                if (action === 'delete') {
                    this.$api(urlTarget).delete('/product/' + value._id).then(response => {
                        if (response.status === 200) {
                            this.$store.dispatch('updateData', {key: this.table, action, data: response.data})
                        }
                    })
                }
            }
            setTimeout(() => {
                //console.log(`${type} data of ${this.table} is success.`)
            }, 1000)
        }
    }
}
</script>