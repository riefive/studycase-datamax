<template>
    <v-container>
    <v-row>
        <v-col 
            v-for="item in list"
            :key="item._id"
            cols="4"
        >
        <v-card>
            <v-card-title>
                <v-avatar tile color="indigo" size="48" class="mr-2">
                    <span class="white--text headline">{{ acronimText(item) }}</span>
                </v-avatar>
                <span class="text-uppercase">{{ item.username }}</span>
            </v-card-title>
            <v-card-subtitle>
                <span class="text-capitalize">{{ item.firstName }} {{ item.lastName }}</span>
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
                <span class="font-weight-medium mr-2">
                    <v-icon small class="mr-1">mdi-calendar-month</v-icon>
                    Date of Birth:
                </span>
                <v-spacer></v-spacer>
                <span class="text-capitalize">{{ item.dateOfBirth }}</span>
                <v-spacer></v-spacer>
                <span class="font-weight-medium mr-2">
                    <v-icon small class="mr-1">mdi-email</v-icon>
                    Email:
                </span>
                <v-spacer></v-spacer>
                <span class="text-capitalize">{{ item.email }}</span>
                <v-spacer></v-spacer>
                <span class="font-weight-medium mr-2">
                    <v-icon small class="mr-1">mdi-phone</v-icon>
                    Phone:
                </span>
                <v-spacer></v-spacer>
                <span class="text-capitalize">{{ item.phone }}</span>
                <v-spacer></v-spacer>
                <span class="font-weight-medium mr-2">
                    <v-icon small class="mr-1">mdi-map-marker</v-icon>
                    Address:
                </span>
                <v-spacer></v-spacer>
                <span class="text-capitalize">{{ item.address }}</span>
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
        acronimText (item) {
            return String(item.firstName).substring(0, 1).toUpperCase() + String(item.lastName).substring(0, 1).toUpperCase()
        },
        onRoute () {
            this.$router.push('/users')
        }
    }
}
</script>