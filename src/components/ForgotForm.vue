<template>
    <v-container fluid>
        <v-form
            ref="forgotForm"
            v-model="valid"
            lazy-validation
        >
        <v-alert dense outlined class="mx-5" type="error" v-show="alert">
            {{ message }}
        </v-alert>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <span class="caption">Find your email. Enter your recovery email</span>
            </v-col>
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
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12">
                <v-btn block :disabled="!valid" id="forgotbtn" color="success" class="mt-1 mb-2" @click="onValidate">
                    Reset Password
                </v-btn>
            </v-col>
        </v-row>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: 'ForgotForm',
    data: () => ({
        valid: true,
        alert: false,
        message: '',
        email: '',
        emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid',
        ]
    }),
    methods: {
        onValidate () {
            let isAccept = false
            if (this.$refs.forgotForm.validate()) {
                this.$store.dispatch('updateInputForm', {
                    key: 'forgot',
                    data: {email: this.email}
                })
                let sentObject = {
                    email: this.email
                }
                let item = this.$store.getters.getCollectionByQuery('users', sentObject)
                if (! item) {
                    this.alert = true 
                    this.message = 'Email is not exists.'
                    setTimeout(() => {
                        this.alert = false
                    }, 5000)
                }
                else {
                    isAccept = true
                    let reminds = {
                        date: new Date().toISOString(),
                        email: this.email,
                        secret: Math.random().toString(36).slice(-10),
                        sent: false
                    }
                    this.$store.dispatch('updateData', {key: 'reminders', action: 'post', data: reminds})
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