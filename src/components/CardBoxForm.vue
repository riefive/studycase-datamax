<template>
    <v-card
        class="mx-auto"
        :class="showElevation ? 'elevation-10' : ''"
        :max-width="maxWidth"
        outlined
    >
    <v-card-text v-if="showTitle">
        <p class="headline text--primary text-uppercase" v-show="text.show">
            {{ titleText }}
        </p>
    </v-card-text>
        <v-alert class="mx-5" type="success" v-if="alertShow">
            {{ alertText }}
        </v-alert>
        <v-divider v-show="showDivider"></v-divider>
        <slot></slot>
        <v-snackbar v-model="snackbar">
            {{ alertText }}
            <v-btn color="pink" text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-card>
</template>

<script>
export default {
    name: 'CardBox',
    data: () => ({
        snackbar: false
    }),
    inject: {
        text: {
            child: 'My Child Text'
        }
    },
    props: {
        alertShow: {
            type: Boolean,
            default: false
        },
        alertText: {
            type: String,
            default: 'A success alert.'
        },
        titleText: {
            type: String,
            default: 'Card Title'
        },
        maxWidth: {
            type: Number,
            default: 600
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        showDivider: {
            type: Boolean,
            default: true
        },
        showElevation: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        alertShow (value) {
            if (value === true) {
                this.snackbar = true
            }
        }
    }
}
</script>