<template>
    <card-provider class="mt-5 mb-5">
        <card-box-form 
            title-text="Login" 
            :alert-text="message" 
            :alert-show="valid"
        >
            <login-form v-model="valid"></login-form>
        </card-box-form>
    </card-provider>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        valid: false,
        message: 'Login success.'
    }),
    components: {
        CardProvider: () => import ('@/components/CardProvider'),
        CardBoxForm: () => import ('@/components/CardBoxForm'),
        LoginForm: () => import ('@/components/LoginForm')
    }
}
</script>