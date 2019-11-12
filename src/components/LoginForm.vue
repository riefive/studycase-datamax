<template>
    <v-container fluid>
        <v-form
            ref="loginForm"
            v-model="valid"
            lazy-validation
        >
        <v-alert dense outlined id="notification" class="mx-5" type="error" v-show="displayAlert || alert">
            {{ displayText || message }}
        </v-alert>
        <v-row v-resize="onResize" align="center" justify="center">
            <v-col cols="12">
                <v-text-field
                    name="email"
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    prepend-icon="mdi-email"
                    required
                >
                </v-text-field>
                <v-text-field
                    name="password"
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    :append-icon="showcode ? 'mdi-eye' : 'mdi-eye-off'"
                    prepend-icon="mdi-lock"
                    :type="showcode ? 'text' : 'password'"
                    :counter="25"
                    @click:append="showcode = !showcode"
                    :autocomplete="false"
                    required
                >
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" align="right">
                <router-link id="linkRegister" class="caption" to="/register">i don`t have an account</router-link>
                |
                <router-link id="linkForgot" class="caption" to="/forgot">forgot password</router-link>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12">
                <v-btn block :disabled="!valid" id="loginbtn" color="primary" class="mt-1 mb-2" @click="onValidate">
                    Login
                </v-btn>
                <v-btn block color="error" class="mr-4 mb-2" @click="onReset">
                    Reset
                </v-btn>
            </v-col>
        </v-row>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: 'LoginForm',
    data: () => ({
        valid: true,
        alert: false,
        message: '',
        email: '',
        password: '',
        showcode: false,
        emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && (v.length >= 8 && v.length <= 25)) || 'Password must be between 8 to 25 characters',
        ],
        windowSize: {
            x: 0,
            y: 0,
        },
    }),
    props: {
        displayAlert: {
            type: Boolean,
            default: false
        },
        displayText: {
            type: String,
            default: ''
        }
    },
    methods: {
        onReset () {
            this.$refs.loginForm.reset()
            this.$emit('input', false)
        },
        onResetValidation () {
            this.$refs.loginForm.resetValidation()
        },
        onResize () {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        },
        onValidate () {
            let isAccept = false
            if (this.$refs.loginForm.validate()) {
                this.$store.dispatch('updateInputForm', {
                    key: 'login',
                    data: {email: this.email, password: this.password}
                })
                let sentObject = {
                    email: this.email,
                    password: this.password
                }
                let item = this.$store.getters.getCollectionByQuery('users', sentObject)
                if (! item) {
                    this.alert = true 
                    this.message = 'Email or password is not match.'
                    setTimeout(() => {
                        this.alert = false
                    }, 5000)
                }
                else {
                    isAccept = true
                    this.$store.dispatch('updateLogin', true)
                    this.$store.dispatch('updateCurrentUser', {
                        _id: item._id,
                        username: item.username,
                        fullname: `${item.firstName} ${item.lastName}`,
                        email: item.email
                    })
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1500)
                }
            }
            this.$emit('input', isAccept)
        }
    },
    mounted () {
        this.onResize()
    }
}
</script>