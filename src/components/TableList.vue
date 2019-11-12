<template>
    <v-container>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="collections"
            :single-select="singleSelect"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            :item-key="primary"
            :search="search"
            show-select
            show-expand
            class="mx-2 my-2 elevation-1"
            :loading="loaded" 
            loading-text="Loading... Please wait"
        >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-btn class="mt-2 ml-2" color="primary" @click="onInsertItem">
                    <v-icon class="mr-2">{{ button.icon }}</v-icon>
                    {{ button.name }}
                </v-btn>
                <v-btn class="mt-2 ml-2" color="warning" @click="onEnabled">
                    <v-icon class="mr-2">mdi-check</v-icon>
                    Enabled
                </v-btn>
                <v-btn class="mt-2 ml-2" color="error" @click="onDisabled">
                    <v-icon class="mr-2">mdi-close</v-icon>
                    Disabled
                </v-btn>
            </v-toolbar>
            <v-text-field v-model="search" label="Search" class="mx-4" prepend-icon="mdi-magnify"></v-text-field>
        </template>
        <template v-slot:item.fullname="{ item }">
            {{ String(item.firstName + ' ' + item.lastName).length > 15 ? String(item.firstName + ' ' + item.lastName).substring(0, 12) + '...' : String(item.firstName + ' ' + item.lastName)}}
        </template>
        <template v-slot:item.email="{ item }">
            {{ item.email.length > 20 ? String(item.email).substring(0, 17) + '...' : item.email }}
        </template>
        <template v-slot:item.color="{ item }">
            <v-chip :color="item.color" dark>{{ item.color }}</v-chip>
        </template>
        <template v-slot:item.enabled="{ item }">
            <v-icon v-if="item.enabled === true">mdi-check</v-icon>
            <v-icon v-else>mdi-close</v-icon>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon class="mr-2" color="green" style="cursor: pointer;" @click="onEditItem(item)">mdi-square-edit-outline</v-icon>
            <v-icon color="red" style="cursor: pointer;" @click="onRemoveItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <v-card
                    class="mx-2 my-2"
                    outlined
                >
                <v-card-text>
                    <p 
                        class="subtitle-1 text--primary"
                        v-for="subItem in anothers"
                        :key="subItem"
                    >
                        {{ item[subItem] }}
                    </p>
                </v-card-text>
                </v-card>
            </td>
        </template>
        <template v-slot:no-data>
           
        </template>
        </v-data-table>
        <v-dialog
            v-model="dialogForm"
            max-width="800"
        >
            <v-card>
                <v-card-title class="headline">{{ dialogTitleForm }}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-alert dense outlined class="mx-2" type="error" v-show="alert">
                        {{ message }}
                    </v-alert>
                </v-card-text>
                <modal-form v-bind="currentItem" v-model="updateItem"></modal-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn size="64" color="error" @click="onCancel">Cancel</v-btn>
                    <v-btn color="primary" @click="onSave">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog 
            v-model="dialog" 
            max-width="360"
        >
            <v-card>
                    <v-card-title class="headline">{{ dialogTitle }}</v-card-title>
                    <v-card-text>{{ dialogContent }}</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="onNo">No</v-btn>
                        <v-btn color="green darken-1" text @click="onYes">Yes</v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        alert: false,
        loaded: false,
        singleSelect: false,
        singleExpand: false,
        expanded: [],
        selected: [],
        search: '',
        currentItem: null,
        updateItem: null,
        dialog: false,
        dialogForm: false,
        dialogTitle: 'Title',
        dialogTitleForm: 'Title Action',
        dialogContent: 'Content',
        dialogAction: '',
        message: '',
        headers: [],
        anothers: [],
        button: { icon: 'mdi-plus', name: 'Add Item' },
        primary: '_id',
        table: ''
    }),
    components: {
        ModalForm: () => import ('@/components/EmptyForm')
    },
    computed: {
        collections () {
            return []
        },
        collectionName () {
            return String(this.table).substring(0, this.table.length-1)
        }
    },
    methods: {
        checkInvalidInput () {
            let empties = false 
            if (this.updateItem) {
                for (const key in this.updateItem) {
                    const element = this.updateItem[key]
                    if (key === '_id') continue;
                    if (typeof element === 'string' && element.trim().length === 0) {
                        empties = true
                        break;
                    }
                }
            }
            return empties
        },
        onEnabled () {
            this.dialogAction = 'enabled'
            this.dialog = true
            this.dialogTitle = 'Enabled items'
            this.dialogContent = 'Are you sure to enabled these selected items?'
        },
        onDisabled () {
            this.dialogAction = 'disabled'
            this.dialog = true
            this.dialogTitle = 'Disabled items'
            this.dialogContent = 'Are you sure to disabled these selected items?'
        },
        onActionItem () {
            return false
        },
        onInsertItem () {
            this.dialogForm = true
            this.dialogAction = 'inserted'
            this.$store.dispatch('updateActiveModal', true)
            this.currentItem = {}
            this.dialogTitleForm = `Add a ${this.collectionName}`
        },
        onEditItem (item) {
            this.dialogForm = true
            this.dialogAction = 'updated'
            this.$store.dispatch('updateActiveModal', true)
            this.currentItem = item
            this.dialogTitleForm = `Update a ${this.collectionName}`
        },
        onRemoveItem (item) {
            this.dialogAction = 'removed'
            this.dialog = true
            this.dialogTitle = 'Remove a item'
            this.dialogContent = `Are you sure to remove this item "${item[this.primary]}"?`
            this.currentItem = item
        },
        onCancel () {
            this.dialogForm = false
        },
        onSave () {
            this.$store.dispatch('updateActiveModal', false)
            setTimeout(() => {
                this.dialogForm = false
                let invalid = this.checkInvalidInput()
                //console.log(this.table, JSON.stringify(this.updateItem))
                if (invalid) {
                    this.dialogForm = true
                    this.alert = true
                    this.message = 'Validation error.'
                    setTimeout(() => {
                        this.alert = false
                    }, 5000)
                    return false
                }
                let action = ''
                if (this.dialogAction === 'inserted') action = 'post'
                if (this.dialogAction === 'updated') action = 'put'
                if (action !== '') {
                    this.onActionItem(action, this.updateItem)
                }
            }, 500)
        },
        onNo () {
            this.dialog = false
        },
        onYes () {
            this.dialog = false
            let selected = []
            if (this.dialogAction === 'enabled' || this.dialogAction === 'disabled') {
                selected = this.selected
                selected.forEach(element => {
                    element.enabled = this.dialogAction === 'enabled' ? true : false
                    this.onActionItem('put', element)
                })
            }
            else if (this.dialogAction === 'removed') {
                this.onActionItem('delete', this.currentItem)
            }
        }
    }
}
</script>