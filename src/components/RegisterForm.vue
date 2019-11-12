<template>   
    <v-container fluid>
        <v-form
            ref="registerForm"
            v-model="valid"
            lazy-validation
        >
        <v-alert dense outlined class="mx-5" type="error" v-show="alert">
            {{ message }}
        </v-alert>
        <v-row align="center" justify="center">
            <v-col cols="6">
                <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    label="Username"
                    prepend-icon="mdi-account"
                    :counter="30"
                    required
                >
                </v-text-field>
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Full Name"
                    prepend-icon="mdi-account-card-details"
                    required
                >
                </v-text-field>
                <v-select
                    v-model="work"
                    :items="workList"
                    :rules="workRules"
                    label="Work"
                    prepend-icon="mdi-briefcase"
                    required
                >
                </v-select>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    prepend-icon="mdi-email"
                    required
                >
                </v-text-field>
                <v-text-field
                    v-model="phone"
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
                    v-model="address"
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
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12">
                <v-btn block :disabled="!valid" color="success" class="mt-1 mb-2" @click="onValidate">
                    Register
                </v-btn>
            </v-col>
        </v-row>
        </v-form>
    </v-container>
</template>

<script>
let currentDate = new Date()
currentDate.setFullYear(2000)
export default {
    name: 'RegisterForm',
    data: () => ({
        valid: true,
        alert: false,
        message: '',
        workList: [
            'Web Developer', 'Software Engineer - Frontend', 'Software Engineer - Backend', 
            'Cyber Security', 'Technology Solution Developer'
        ],
        dateMenu: false,
        date: currentDate.toISOString().substr(0, 10),
        dateText: '',
        username: '',
        name: '',
        work: '',
        email: '',
        phone: '',
        address: '',
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
            v => /(^62)([0-9]{9,15})/.test(v) || 'Phone must be valid',
        ],
        addressRules: [
            v => !!v || 'Address is required'
        ]
    }),
    computed: {
        dateFormatted: {
            get () {
                return ! this.date ? '' : this.formatDate(this.date)
            },
            set (value) {
                this.dateText = value
            }
        },
        checkPasswordConfirmRules () {
            return [
                v => !!v || 'Confirm Password is required',
                () => (this.newpassword === this.confirmpassword) || 'Confirm Password must be the same as new password'
            ]
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
        onValidate () {
            let isAccept = false
            let apiIsReady = this.$store.state.apiIsReady
            let urlTarget = this.$store.getters.getApiUrl
            if (this.$refs.registerForm.validate()) {
                let sentObject = {
                    username: this.username
                }
                let item = this.$store.getters.getCollectionByQuery('users', sentObject)
                if (item) {
                    this.alert = true 
                    this.message = 'Username is exists.'
                    setTimeout(() => {
                        this.alert = false
                    }, 5000)
                }
                else {
                    isAccept = true
                    let names = this.name.split(' ')
                    let newUser = {
                        username: this.username,
                        password: this.newpassword,
                        firstName: names[0],
                        lastName: names[names.length - 1],
                        work: this.work,
                        email: this.email,
                        phone: this.phone,
                        dateOfBirth: this.dateFormatted,
                        address: this.address,
                        city: 'Unknow',
                        zipcode: Math.ceil(Math.random() * Math.pow(10, 5)),
                        enabled: true
                    }
                    if (! apiIsReady) {
                        this.$store.dispatch('updateData', {key: 'users', action: 'post', data: newUser})
                    }
                    else {
                        this.$api(urlTarget).post('/user', newUser).then(response => {
                            if (response.status === 200) {
                                this.$store.dispatch('updateData', {key: 'users', action: 'post', data: response.data})
                            }
                        })
                    }
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 1500)
                }
            }
            this.$emit('input', isAccept)
        }
    }
}
</script>