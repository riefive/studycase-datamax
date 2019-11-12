<template>
    <card-provider class="mt-5 mb-5">
        <card-box-form 
            title-text="Register an Account" 
            :max-width="800"
            :alert-text="message" 
            :alert-show="valid"
        >
            <register-form v-model="valid"></register-form>
        </card-box-form>
    </card-provider>
</template>

<script>
export default {
    name: 'Register',
    data: () => ({
        valid: false,
        message: 'Register success.'
    }),
    components: {
        CardProvider: () => import ('@/components/CardProvider'),
        CardBoxForm: () => import ('@/components/CardBoxForm'),
        RegisterForm: () => import ('@/components/RegisterForm')
    }
}
</script>