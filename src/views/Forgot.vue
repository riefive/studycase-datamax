<template>
    <card-provider class="mt-5 mb-5">
        <card-box-form 
            title-text="Forgot Password" 
            :alert-text="message" 
            :alert-show="valid"
        >
            <forgot-form v-model="valid"></forgot-form>
        </card-box-form>
    </card-provider>
</template>

<script>
export default {
    name: 'Forgot',
    data: () => ({
        valid: false,
        message: 'Sent a password at your mail is success.'
    }),
    components: {
        CardProvider: () => import ('@/components/CardProvider'),
        CardBoxForm: () => import ('@/components/CardBoxForm'),
        ForgotForm: () => import ('@/components/ForgotForm')
    }
}
</script>