<template>
    <v-container fluid>
        <v-form
            ref="resetForm"
            v-model="valid"
            lazy-validation
        >
        <v-alert dense outlined class="mx-5" type="error" v-show="alert">
            {{ message }}
        </v-alert>
        <v-row>
            <v-col cols="12">
                <v-text-field
                    name="oldpassword"
                    v-model="password"
                    :rules="passwordRules"
                    label="Old Password"
                    :append-icon="showcode ? 'mdi-eye' : 'mdi-eye-off'"
                    prepend-icon="mdi-lock"
                    :type="showcode ? 'text' : 'password'"
                    :counter="25"
                    @click:append="showcode = !showcode"
                    :autocomplete="false"
                    required
                >
                </v-text-field>
                <v-text-field
                    name="newpassword"
                    v-model="newpassword"
                    :rules="newPasswordRules"
                    label="New Password"
                    :append-icon="showcodeTwo ? 'mdi-eye' : 'mdi-eye-off'"
                    prepend-icon="mdi-lock-open-variant"
                    :type="showcodeTwo ? 'text' : 'password'"
                    :counter="25"
                    @click:append="showcodeTwo = !showcodeTwo"
                    :autocomplete="false"
                    required
                >
                </v-text-field>
                <v-text-field
                    name="confirmpassword"
                    v-model="confirmpassword"
                    :rules="checkPasswordConfirmRules"
                    label="Confirm Password"
                    :append-icon="showcodeThree ? 'mdi-eye' : 'mdi-eye-off'"
                    prepend-icon="mdi-lock-open-variant-outline"
                    :type="showcodeThree ? 'text' : 'password'"
                    @click:append="showcodeThree = !showcodeThree"
                    :autocomplete="false"
                    required
                >
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-btn block :disabled="!valid" id="resetbtn" color="info" class="mt-1 mb-2" @click="onValidate">
                    <v-icon class="mr-2">mdi-check</v-icon>
                    Save
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn block color="error" class="mt-1 mb-2" @click="onReset">
                    <v-icon class="mr-2">mdi-close</v-icon>
                    Clear
                </v-btn>
            </v-col>
        </v-row>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: 'ResetForm',
    data: () => ({
        valid: true,
        alert: false,
        message: '',
        password: '',
        newpassword: '',
        confirmpassword: '',
        showcode: false,
        showcodeTwo: false,
        showcodeThree: false,
        passwordRules: [
            v => !!v || 'Old Password is required',
            v => (v && (v.length >= 8 && v.length <= 25)) || 'Password must be between 8 to 25 characters',
        ],
        newPasswordRules: [
            v => !!v || 'New Password is required',
            v => (v && (v.length >= 8 && v.length <= 25)) || 'New Password must be between 8 to 25 characters',
        ],
        confirmPasswordRules: [
            v => !!v || 'Confirm Password is required'
        ],
    }),
    computed: {
        checkPasswordConfirmRules () {
            return [
                v => !!v || 'Confirm Password is required',
                () => (this.newpassword === this.confirmpassword) || 'Confirm Password must be the same as new password'
            ]
        }
    },
    methods: {
        onReset () {
            this.$refs.resetForm.reset()
            this.$emit('input', false)
        },
        onValidate () {
            let isAccept = false
            let apiIsReady = this.$store.state.apiIsReady
            let urlTarget = this.$store.getters.getApiUrl
            let currentUser = this.$store.state.currentUser
            if (this.$refs.resetForm.validate()) {
                let sentObject = {
                    _id: currentUser._id,
                    password: this.password
                }
                let item = this.$store.getters.getCollectionByQuery('users', sentObject)
                if (! item) {
                    this.alert = true 
                    this.message = 'Password is not match.'
                    setTimeout(() => {
                        this.alert = false
                        this.$refs.resetForm.reset()
                    }, 5000)
                }
                else {
                    isAccept = true
                    item.password = this.newpassword
                    if (! apiIsReady) {
                        this.$store.dispatch('updateData', {key: 'users', action: 'put', data: item})
                    }
                    else {
                        this.$api(urlTarget).put('/user/' + currentUser._id, item).then(response => {
                            if (response.status === 200) {
                                this.$store.dispatch('updateData', {key: 'users', action: 'put', data: response.data})
                            }
                        })
                    }
                }
            }
            this.$emit('input', isAccept)
        }
    }
}
</script>