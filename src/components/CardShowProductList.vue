<template>
    <v-container>
    <v-row>
        <v-col 
            v-for="item in list"
            :key="item._id"
            cols="4"
        >
        <v-card
            class="mx-auto"
        >
            <v-img
                class="white--text align-end"
                height="150px"
                :style="`background-color: ${item.color};`"
            >
                <v-card-title>
                    <span class="subtitle-1 text-uppercase">{{ item.name }}</span>
                </v-card-title>
            </v-img>
            <v-card-subtitle>{{ item.title }}</v-card-subtitle>
            <v-card-text>
                <span class="font-weight-medium mr-2">
                    <v-icon class="mr-1">mdi-counter</v-icon>
                    Quantity:
                </span>
                <span class="text-capitalize">{{ item.quantity }}</span>
                <v-spacer></v-spacer>
                {{ item.description }}
            </v-card-text>
        </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-btn color="primary" @click="onRoute">Read More...</v-btn>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        onRoute () {
            this.$router.push('/products')
        }
    }
}
</script>