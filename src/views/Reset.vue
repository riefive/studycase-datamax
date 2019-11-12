<template>
    <card-provider class="mt-5 mb-5">
        <card-box-form 
            title-text="Reset Password" 
            :alert-text="message" 
            :alert-show="valid"
            :max-width="900"
            :show-title="true"
            :show-divider="false"
        >
            <reset-form v-model="valid"></reset-form>
        </card-box-form>
    </card-provider>
</template>

<script>
export default {
    name: 'Reset',
    data: () => ({
        valid: false,
        message: 'Reset password is success.'
    }),
    components: {
        CardProvider: () => import ('@/components/CardProvider'),
        CardBoxForm: () => import ('@/components/CardBoxForm'),
        ResetForm: () => import ('@/components/ResetForm')
    }
}
</script>