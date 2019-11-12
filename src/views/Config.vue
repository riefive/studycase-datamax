<template>
    <card-provider class="mt-5 mb-5">
        <card-box-form title-text="Data Config">
            <init-form></init-form>
        </card-box-form>
    </card-provider>
</template>

<script>
export default {
    name: 'Config',
    components: {
        CardProvider: () => import ('@/components/CardProvider'),
        CardBoxForm: () => import ('@/components/CardBoxForm'),
        InitForm: () => import ('@/components/InitForm')
    }
}
</script>