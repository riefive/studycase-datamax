<template>
    <v-container fluid>
        <v-form ref="userForm">
        <v-row align="center" justify="center">
            <v-col cols="6">
                <input name="_id" type="hidden" v-model="_id"/>
                <v-text-field
                    :value="username" 
                    @input="v => result.username = v"
                    :rules="usernameRules"
                    label="Username"
                    prepend-icon="mdi-account"
                    :counter="30"
                    required
                >
                </v-text-field>
                <v-text-field
                    :value="currentName" 
                    @input="v => result.name = v"
                    :rules="nameRules"
                    label="Full Name"
                    prepend-icon="mdi-account-card-details"
                    required
                >
                </v-text-field>
                <v-text-field
                    :value="work" 
                    @input="v => result.work = v"
                    :rules="workRules"
                    label="Work"
                    prepend-icon="mdi-briefcase"
                    required
                >
                </v-text-field>
                <v-text-field
                    :value="email" 
                    @input="v => result.email = v"
                    :rules="emailRules"
                    label="E-mail"
                    prepend-icon="mdi-email"
                    required
                >
                </v-text-field>
                <v-text-field
                    :value="phone.replace('+', '')" 
                    @input="v => result.phone = v"
                    :rules="phoneRules"
                    label="Phone"
                    prepend-icon="mdi-phone"
                    type="number"
                    required
                >
                </v-text-field>
            </v-col>
            <v-col cols="6">
                <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{on}">
                        <v-text-field
                            v-model="dateFormatted"
                            label="Date of Birth"
                            prepend-icon="mdi-calendar-month"
                            hint="DD/MM/YYYY Format"
                            persistent-hint
                            readonly
                            required
                            v-on="on"
                        >
                        </v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="dateMenu = false"></v-date-picker>
                </v-menu>
                <v-textarea
                    :value="address" 
                    @input="v => result.address = v"
                    :rules="addressRules"
                    label="Address"
                    hint="Your Address"
                    prepend-icon="mdi-map-marker"
                    no-resize
                >
                </v-textarea>
                <v-text-field
                    name="password"
                    v-model="newpassword"
                    :rules="newPasswordRules"
                    label="Password"
                    :append-icon="showcode ? 'mdi-eye' : 'mdi-eye-off'"
                    prepend-icon="mdi-lock-open-variant"
                    :type="showcode ? 'text' : 'password'"
                    :counter="25"
                    @click:append="showcode = !showcode"
                    :autocomplete="false"
                    required
                >
                </v-text-field>
                <v-text-field
                    name="confirmpassword"
                    v-model="confirmpassword"
                    :rules="checkPasswordConfirmRules"
                    label="Confirm Password"
                    :append-icon="showcodeTwo ? 'mdi-eye' : 'mdi-eye-off'"
                    prepend-icon="mdi-lock-open-variant-outline"
                    :type="showcodeTwo ? 'text' : 'password'"
                    @click:append="showcodeTwo = !showcodeTwo"
                    :autocomplete="false"
                    required
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
let currentDate = new Date()
currentDate.setFullYear(2000)
export default {
    data: () => ({
        result: {},
        dateMenu: false,
        date: currentDate.toISOString().substr(0, 10),
        dateText: '',
        newpassword: '',
        confirmpassword: '',
        showcode: false,
        showcodeTwo: false,
        newPasswordRules: [
            v => !!v || 'Password is required',
            v => (v && (v.length >= 8 && v.length <= 25)) || 'Password must be between 8 to 25 characters',
        ],
        usernameRules: [
            v => !!v || 'Username is required',
            v => (v && v.length <= 30) || 'Username must be less than 30 characters',
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length > 5) || 'Username must be greater than 5 characters',
        ],
        workRules: [
            v => !!v || 'Work is required'
        ],
        emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        phoneRules: [
            v => !!v || 'Phone is required',
            v => /^(62)([0-9]{9,15})/.test(v) || 'Phone must be valid',
        ],
        addressRules: [
            v => !!v || 'Address is required'
        ]
    }),
    props: {
        _id: {
            type: String,
            default: ''
        },
        username: {
            type: String,
            default: ''
        },
        firstName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        },
        work: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        dateOfBirth: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        password: {
            type: String,
            default: ''
        },
        enabled: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        activeModal () {
            return this.$store.state.activeModal
        },
        dateFormatted: {
            get () {
                return ! this.date ? '' : this.formatDate(this.date)
            },
            set (value) {
                this.dateText = value
            }
        },
        currentName () {
            return this.firstName + ' ' + this.lastName
        },
        checkPasswordConfirmRules () {
            return [
                v => !!v || 'Confirm Password is required',
                () => (this.newpassword === this.confirmpassword) || 'Confirm Password must be the same as new password'
            ]
        }
    },
    watch: {
        activeModal (value) {
            if (! value) {
                this.$refs.userForm.validate()
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
        formatDate (date) {
            if (! date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate (date) {
            if (! date) return null
            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        changevalue () {
            let currentName = (this.result && 'name' in this.result && this.result.name) ? this.result.name : this.currentName
            let names = currentName.trim().split(' ')
            let props = Object.assign({}, this.$props)
            Object.assign(props, this.result)
            props.dateOfBirth = this.dateFormatted
            props.firstName = names[0]
            props.lastName = names[names.length - 1]
            props.password = this.newpassword
            if (props.phone) {
                props.phone = '+' + String(props.phone).trim().replace('+', '') 
            }
            this.$emit('input', props)
        },
        initialized () {
            this.newpassword = this.password
            if (this.dateOfBirth) {
                this.date = this.parseDate(this.dateOfBirth)
            }
            if (this.enabled) {
                this.result.enabled = this.enabled
            }
        }
    }
}
</script>