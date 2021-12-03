<template>
    <v-layout>
        <div class="WelcomeTool" v-if="this.$store.state.admin.LoginMode">
            <v-btn @click="goMyPage()" target="_blank" text="text">
                <span class="mr-2 blackColorVer">Welcome
                    {{this.admin.id}}</span>
                <v-icon color="black">mdi-account</v-icon>
            </v-btn>
            <v-btn @click="Logout()" target="_blank" text="text">
                <span class="mr-2 blackColorVer">Logout</span></v-btn>
        </div>
        <v-btn
            v-else-if="!this.$store.state.admin.LoginMode"
            @click="goLoginPage()"
            target="_blank"
            text="text">
            <span class="mr-2 blackColorVer">Login</span>
            <v-icon color="black">mdi-lock</v-icon>
        </v-btn>
    </v-layout>
</template>
<script>
    export default {
        computed: {
            admin() {
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
            goMyPage() {
                this
                    .$router
                    .push({path: '/AdminOwnPage', params: {}})
                    .catch(() => {})
                },

            goLoginPage() {
                this
                    .$router
                    .push({path: '/LoginPage', params: {}})
                    .catch(() => {})
                },
            Logout() {
                this
                    .$store
                    .commit('LOGOFF_USER');
                this
                    .$router
                    .push({path: '/', params: {}})
                    .catch(() => {})
            }
        }
    }
</script>
<style>
    .blackColorVer{
        color: black;
    }
    .WelcomeTool {
        margin-right: 50%;
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>