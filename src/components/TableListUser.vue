<script>
import TableList from '@/components/TableList'
export default {
    name: 'TableListUser',
    extends: TableList,
    data: () => ({
        headers: [
            { text: 'Username', value: 'username' },
            { text: 'Email', value: 'email' },
            { text: 'Phone', value: 'phone' },
            { text: 'DOB', value: 'dateOfBirth', align: 'center' },
            { text: 'Enabled', value: 'enabled', align: 'center' },
            { text: 'Actions', value: 'action', sortable: false },
            { text: '', value: 'data-table-expand' }
        ],
        anothers: ['work', 'address', 'city'],
        button: {icon: 'mdi-account-plus', name: 'Add User'},
        table: 'users',
        primary: '_id'
    }),
    components: {
        ModalForm: () => import ('@/components/UserForm')
    },
    computed: {
        collections () {
            let currentUser = this.$store.state.currentUser
            let currentCollections = this.$store.state.collections.users
            return currentCollections.filter(item => item._id !== currentUser._id)
        }
    },
    methods: {
        onActionItem (type, value) {
            let action = type
            let apiType = this.$store.state.apiType
            let currentUser = this.$store.state.currentUser
            if (currentUser && currentUser._id === value._id) {
                alert('Forbidden access the item.')
                return false
            }
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
                    this.$api(urlTarget).post('/user', value).then(response => {
                        if (response.status === 200) {
                            this.$store.dispatch('updateData', {key: this.table, action, data: response.data})
                        }
                    })
                }
                if (action === 'put') {
                    this.$api(urlTarget).put('/user/' + value._id, value).then(response => {
                        if (response.status === 200) {
                            this.$store.dispatch('updateData', {key: this.table, action, data: response.data})
                        }
                    })
                }
                if (action === 'delete') {
                    this.$api(urlTarget).delete('/user/' + value._id).then(response => {
                        if (response.status === 200) {
                            this.$store.dispatch('updateData', {key: this.table, action, data: response.data})
                        }
                    })
                }
            }
            setTimeout(() => {
                console.log(`${type} data of ${this.table} is success.`)
            }, 1000)
        }
    }
}
</script>