<template>
    <v-dialog 
        v-model="selfDialog" 
        max-width="360"
    >
      <v-card>
            <v-card-title class="headline">Logout</v-card-title>
            <v-card-text>Are you sure to logout?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="onNo">
                    No
                </v-btn>
                <v-btn color="green darken-1" text @click="onYes">
                    Yes
                </v-btn>
            </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        selfDialog: false
    }),
    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onNo () {
            this.selfDialog = false
            this.$emit('input', false)
            this.$router.push('/')
        },
        onYes () {
            this.selfDialog = false
            this.$emit('input', true)
        }
    },
    mounted () {
        this.selfDialog = this.dialog
    }
}
</script>