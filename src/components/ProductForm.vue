<template>
    <v-container fluid>
        <v-form ref="productForm">
        <v-row align="center" justify="center">
            <v-col cols="6">
                <input name="_id" type="hidden" v-model="_id"/>
                <input name="image" type="hidden" v-model="image"/>
                <v-text-field
                    :value="name" 
                    @input="v => result.name = v"
                    :rules="nameRules"
                    label="Product Name"
                    prepend-icon="mdi-tag"
                    :counter="5"
                    required
                >
                </v-text-field>
                <v-text-field
                    :value="title" 
                    @input="v => result.title = v"
                    :rules="titleRules"
                    label="Product Title"
                    prepend-icon="mdi-subtitles"
                    required
                >
                </v-text-field>
                <v-textarea
                    :value="description" 
                    @input="v => result.description = v"
                    :rules="descriptionRules"
                    label="Product Description"
                    hint="Your Product description"
                    prepend-icon="mdi-subtitles-outline"
                >
                </v-textarea>
                <v-text-field
                    :value="quantity" 
                    @input="v => result.quantity = v"
                    :rules="quantityRules"
                    label="Quantity"
                    prepend-icon="mdi-counter"
                    required
                >
                </v-text-field>
            </v-col>
            <v-col cols="6">
                <v-color-picker v-model="colorText"></v-color-picker>
                <v-text-field
                    v-model="colorText"
                    label="Color"
                    prepend-icon="mdi-invert-colors"
                    readonly
                >
                </v-text-field>
                <v-checkbox 
                    :value="enabled" 
                    @input="v => result.enabled = v"
                    class="ma-2" 
                    label="Enabled"
                >
                </v-checkbox>
            </v-col>
        </v-row>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        result: {},
        colorText: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length >= 5) || 'Name must be greater than equal 5 characters',
        ],
        titleRules: [
            v => !!v || 'Title is required'
        ],
        descriptionRules: [
            v => !!v || 'Description is required'
        ],
        quantityRules: [
            v => !!v || 'Quantity is required',
            v => v > -1 || 'Quantity must be greather than -1 numbers',
            v => v <= 1000 || 'Quantity must be less than equal 1000 numbers'
        ]
    }),
    props: {
        _id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: () => `img${Math.ceil(Math.random() * 10)}.png`
        },
        color: {
            type: String,
            default: '#FF0000FF'
        },
        quantity: {
            type: [Number, String],
            default: 0
        },
        enabled: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        activeModal () {
            return this.$store.state.activeModal
        }
    },
    watch: {
        activeModal (value) {
            if (! value) {
                this.$refs.productForm.validate()
                this.changevalue()
            }
        },
        $props: {
            deep: true,
            immediate: true,
            handler () {
                this.initialized()
            }
        }
    },
    methods: {
        changevalue () {
            let props = Object.assign({}, this.$props)
            Object.assign(props, this.result)
            props.color = this.colorText
            this.$emit('input', props)
        },
        initialized () {
            if (this.color) {
                this.colorText = this.color
            }
            if (this.enabled) {
                this.result.enabled = this.enabled
            }
        }
    }
}
</script>