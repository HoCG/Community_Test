<template>
    <v-layout class="LoginCheckLayout">
        <v-btn v-if="checkLoginMode()" target="_blank" text="text">
            <span class="mr-2">Welcome
                {{this.admin.id}}</span>
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn
            v-else-if="!checkLoginMode()"
            @click="goLoginPage()"
            target="_blank"
            text="text">
            <span class="mr-2">Login</span>
            <v-icon>mdi-lock</v-icon>
        </v-btn>
    </v-layout>
</template>
<script>
    export default {
        computed: {
            admin(){
                return this.$store.state.admin.currentUser;
            }
        },
        methods: {
            checkLoginMode() {
                if (this.$store.state.admin.LoginMode) {
                    return true;
                } else {
                    return false;
                }
            },
            goLoginPage() {
                this
                    .$router
                    .push({path: '/LoginPage', params: {}})
                    .catch(() => {})
                }
        }
    }
</script>